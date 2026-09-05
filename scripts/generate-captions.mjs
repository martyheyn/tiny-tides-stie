#!/usr/bin/env node
// One-off local tool: transcribe a course video's audio with OpenAI Whisper
// and write out a WebVTT caption file next to it.
//
// Usage:
//   node --env-file=.env scripts/generate-captions.mjs <path-to-video.mp4> [output.vtt]
//
// Requires:
//   - ffmpeg on PATH (brew install ffmpeg)
//   - OPENAI_API_KEY set (e.g. in .env, loaded via --env-file, or exported in your shell)

import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, basename, extname } from 'node:path'

const WHISPER_UPLOAD_LIMIT_BYTES = 25 * 1024 * 1024

async function main() {
  const [inputPath, outputPathArg] = process.argv.slice(2)

  if (!inputPath) {
    console.error(
      'Usage: node --env-file=.env scripts/generate-captions.mjs <path-to-video.mp4> [output.vtt]',
    )
    process.exit(1)
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    console.error(
      'Missing OPENAI_API_KEY. Run with `node --env-file=.env scripts/generate-captions.mjs ...` ' +
        '(with OPENAI_API_KEY set in .env) or export it in your shell first.',
    )
    process.exit(1)
  }

  const outputPath =
    outputPathArg || inputPath.replace(new RegExp(`${extname(inputPath)}$`), '.vtt')

  const tmpDir = mkdtempSync(join(tmpdir(), 'tiny-tides-captions-'))
  const audioPath = join(tmpDir, 'audio.mp3')

  try {
    console.log('Extracting + compressing audio with ffmpeg...')
    // Mono, 16kHz, 64kbps mp3 — plenty for speech-to-text, keeps file size
    // well under Whisper's 25MB upload limit for longer videos.
    execFileSync('ffmpeg', [
      '-y',
      '-i',
      inputPath,
      '-vn',
      '-ac',
      '1',
      '-ar',
      '16000',
      '-b:a',
      '64k',
      audioPath,
    ], { stdio: ['ignore', 'ignore', 'inherit'] })

    const audioBytes = readFileSync(audioPath)
    if (audioBytes.byteLength > WHISPER_UPLOAD_LIMIT_BYTES) {
      console.error(
        `Compressed audio is ${(audioBytes.byteLength / 1024 / 1024).toFixed(1)}MB, ` +
          `over Whisper's 25MB limit. This video is too long for a single request — ` +
          `split it (e.g. with ffmpeg -ss/-t) and transcribe in chunks.`,
      )
      process.exit(1)
    }

    console.log(`Transcribing with Whisper (${basename(inputPath)})...`)
    const form = new FormData()
    form.append('file', new Blob([audioBytes], { type: 'audio/mpeg' }), 'audio.mp3')
    form.append('model', 'whisper-1')
    form.append('response_format', 'verbose_json')

    const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}` },
      body: form,
    })

    if (!res.ok) {
      const body = await res.text()
      console.error(`OpenAI API error (${res.status}): ${body}`)
      process.exit(1)
    }

    const { segments } = await res.json()
    if (!segments || segments.length === 0) {
      console.error('No segments returned — is the audio silent or unsupported?')
      process.exit(1)
    }

    writeFileSync(outputPath, toVtt(segments))
    console.log(`Wrote ${segments.length} caption cues to ${outputPath}`)
    console.log('Review it for accuracy before wiring it up to the player.')
  } finally {
    rmSync(tmpDir, { recursive: true, force: true })
  }
}

function toVtt(segments) {
  const cues = segments
    .map(
      (s) =>
        `${formatTimestamp(s.start)} --> ${formatTimestamp(s.end)}\n${s.text.trim()}`,
    )
    .join('\n\n')

  return `WEBVTT\n\n${cues}\n`
}

function formatTimestamp(seconds) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  const ms = Math.round((seconds - Math.floor(seconds)) * 1000)

  const pad = (n, len = 2) => String(n).padStart(len, '0')
  return `${pad(h)}:${pad(m)}:${pad(s)}.${pad(ms, 3)}`
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

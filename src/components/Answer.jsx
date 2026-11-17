import { Fragment } from 'react'

function inline(text, keyPrefix) {
  const parts = text
    .split(/(\*\*[^*]+\*\*|\*[^*\n]+\*|\[\[(?:[^\[\]]|\[[^\[\]]*\])*\]\])/g)
    .filter(Boolean)
  return parts.map((part, i) => {
    const key = `${keyPrefix}-${i}`
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={key}>{inline(part.slice(2, -2), `${key}-b`)}</strong>
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return <em key={key}>{part.slice(1, -1)}</em>
    }
    if (part.startsWith('[[') && part.endsWith(']]')) {
      return <code key={key}>{part.slice(2, -2)}</code>
    }
    return <Fragment key={key}>{part}</Fragment>
  })
}

/**
 * Tiny markdown-ish renderer built for the question bank.
 * Supports paragraphs, ~~~ code fences, **bold**, [[inline code]],
 * unordered lists (with simple indentation) and ordered lists.
 */
export default function Answer({ text }) {
  const lines = text.split('\n')
  const blocks = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.trim() === '') {
      i += 1
      continue
    }

    // Code fence
    if (line.trimStart().startsWith('~~~')) {
      const lang = line.trim().slice(3).trim()
      const code = []
      i += 1
      while (i < lines.length && !lines[i].trimStart().startsWith('~~~')) {
        code.push(lines[i])
        i += 1
      }
      i += 1
      blocks.push(
        <pre key={`code-${i}`} className="code-block">
          <code>{code.join('\n')}</code>
          {lang && <span className="code-lang">{lang}</span>}
        </pre>,
      )
      continue
    }

    // Unordered list
    if (line.trimStart().startsWith('- ')) {
      const items = []
      while (i < lines.length && lines[i].trimStart().startsWith('- ')) {
        const raw = lines[i]
        const indent = raw.length - raw.trimStart().length
        items.push({
          depth: indent >= 2 ? 1 : 0,
          content: raw.trimStart().slice(2),
        })
        i += 1
      }
      blocks.push(
        <ul key={`ul-${i}`} className="answer-list">
          {items.map((item, idx) => (
            <li key={idx} className={item.depth ? 'nested' : ''}>
              {inline(item.content, `li-${i}-${idx}`)}
            </li>
          ))}
        </ul>,
      )
      continue
    }

    // Ordered list
    if (/^\d+\.\s/.test(line.trimStart())) {
      const items = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trimStart())) {
        items.push(lines[i].trimStart().replace(/^\d+\.\s/, ''))
        i += 1
      }
      blocks.push(
        <ol key={`ol-${i}`} className="answer-list ordered">
          {items.map((item, idx) => (
            <li key={idx}>{inline(item, `oli-${i}-${idx}`)}</li>
          ))}
        </ol>,
      )
      continue
    }

    blocks.push(
      <p key={`p-${i}`} className="answer-p">
        {inline(line.trim(), `p-${i}`)}
      </p>,
    )
    i += 1
  }

  return <div className="answer-content">{blocks}</div>
}

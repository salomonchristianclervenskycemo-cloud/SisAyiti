import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const chunkPath = path.resolve(
  __dirname,
  '../.next/dev/static/chunks/components_module-comprendre_tsx_01gnnv~._.js'
)
const outPath = path.resolve(__dirname, '../lib/translations/comprendre-quiz.ts')

const src = fs.readFileSync(chunkPath, 'utf8')
const start = src.indexOf('const quizzes = {')
const end = src.indexOf('};\nfunction QuizPanel')
if (start < 0 || end < 0) {
  console.error('Could not locate quizzes block in chunk')
  process.exit(1)
}

const objLiteral = src.slice(start + 'const quizzes = '.length, end + 1)
// eslint-disable-next-line no-eval
const quizzes = eval(`(${objLiteral})`)
const sections = [0, 1, 2, 3, 4].map((i) => quizzes[i])

const file = `export type QuizLang = "fr" | "kr" | "en" | "es"

export type QuizQuestion = {
  q: string
  options: string[]
  correct: number
}

export type SectionQuiz = Record<QuizLang, QuizQuestion[]>

/** Quiz questions per Comprendre section (0–4). */
export const comprendreQuizzes: SectionQuiz[] = ${JSON.stringify(sections, null, 2)} as SectionQuiz[]
`

fs.writeFileSync(outPath, file)
console.log('Wrote', outPath)

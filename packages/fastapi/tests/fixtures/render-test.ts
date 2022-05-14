
import { join } from 'node:path'
import { readFileSync } from 'fs-extra'
import { FastApi, Rest, Post, Get } from '../../src'
const baseDir = join(__dirname, 'files')

const getContent = (name: string) => readFileSync(join(baseDir, name))


@Rest
export class RenderTest extends FastApi {

  @Get('/stuff/text')
  public text() {
    const content = getContent('test.txt')

    this.$text(content)
  }

  @Get('/stuff/markdown')
  public markdown() {
    const content = getContent('test.md')
    return this.$text(content, 'markdown')
  }

  @Get('/stuff/html')
  public html() {
    const content = getContent('test.html')

    this.$html(content)
  }

  @Post('/posts-test')
  public posts(year: number, month: number, day: number, slug?: string) {

    this.$json({
      date: [year, month, day].join('-'),
      slug: slug ? slug : 'NOTHING'
    })
  }
}

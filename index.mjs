import looksSame from 'looks-same'
import puppeteer from 'puppeteer'
import simpleVrtConfig from './simple-vrt.config.mjs'

const main = async () => {
  const browser = await puppeteer.launch({headless: 'new'})
  const page = await browser.newPage()
  await page.goto(simpleVrtConfig.targetUrl)
  await page.setViewport(simpleVrtConfig.viewport)
  await page.screenshot({ path: simpleVrtConfig.screenshotFileName })
  const res = await looksSame.createDiff({
    reference: simpleVrtConfig.expect,
    current: simpleVrtConfig.screenshotFileName,
    diff: simpleVrtConfig.diffFileName,
    strict: false,
    tolerance: 50,
  })
  await browser.close()
}

main()

export default main

#!/usr/bin/env node

import looksSame from 'looks-same'
import puppeteer from 'puppeteer'
import simpleVrtConfig from '../../simple-vrt.config.mjs'

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
  const result = await looksSame(simpleVrtConfig.expect, simpleVrtConfig.screenshotFileName)
  if (result.equal) {
    console.log(colorizeText("Test passed", "32"))
  } else {
    console.error(colorizeText("Test failed. Exported difference files to " + simpleVrtConfig.diffFileName, "31"))
  }
  await browser.close()
}

const colorizeText =(text, colorCode) => {
  return `\x1b[${colorCode}m${text}\x1b[0m`
}

main()

export default main

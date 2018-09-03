'use strict'

/**
* dimer-markdown
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const detab = require('detab')
const u = require('unist-builder')
const { parseThematicBlock } = require('../utils/index')

module.exports = function (h, node) {
  const value = node.value ? detab(node.value + '\n') : ''
  const { lang, lineHighlights, fileName } = parseThematicBlock(node.lang)

  const props = {
    className: lang ? [lang, 'line-numbers'] : ['line-numbers']
  }

  if (lineHighlights) {
    props.dataLine = lineHighlights
  }

  const childs = []

  /**
   * If filename, then set span as a first child
   */
  if (fileName) {
    childs.push(h(node, 'span', { className: ['filename'] }, [u('text', fileName)]))
  }

  /**
   * Set pre as a child
   */
  childs.push(h(node, 'pre', props, [
    h(node, 'code', [u('text', value)])
  ]))

  return h(node.position, 'div', { className: ['dimer-highlight'] }, childs)
}

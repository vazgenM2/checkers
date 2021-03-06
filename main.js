let game = document.querySelector('.game')

document.querySelector('.start-btn').addEventListener('click', () => {
	document.querySelector('.home').style.display = 'none'
	game.style.display = 'flex'
})

window.onload = function () {

	// ====================================== Generating figure
	function generateFigure(place, type) {
		let figure = document.createElement('div')
		figure.classList.add('figure')
		if (type == 'black') figure.classList.add('black')

		place.appendChild(figure)
	}

	// ====================================== Generating blocks
	let blockDir = true
	let destroyedBlock;
	let blockX = 0
	let blockY = 0
	let figureParams = [0, 0]
	for (let i = 0; i < 64; i++) {
		let block = document.createElement('div')
		block.classList.add('block')
		if (blockDir && i % 2 == 0) block.classList.add('black')
		else if (!blockDir && i % 2 !== 0) block.classList.add('black')

		if ((i + 1) % 8 == 0) {
			blockDir = !blockDir
		}
		if (i % 8 == 0 && i !== 0) {
			blockY++
			blockX = 0
		}
		if (block.classList.contains('black')) {
			if (i >= 0 && i <= 23) generateFigure(block, 'white')
			if (i >= 39 && i <= 63) generateFigure(block, 'black')
			if (i >= 0 && i <= 7) block.classList.add('special-black')
			if (i >= 55 && i <= 63) block.classList.add('special-white')
		}

		block.setAttribute('x', blockX)
		block.setAttribute('y', blockY)
		block.classList.add('x' + blockX)
		block.classList.add('y' + blockY)
		game.appendChild(block)

		blockX++

		block.addEventListener('click', () => {
			if (block.children.length) {
				figureParams = [+block.getAttribute('x'), +block.getAttribute('y')]
				for (let i = 0; i < document.querySelectorAll('.block').length; i++) {
					document.querySelectorAll('.block')[i].classList.remove('select')
					document.querySelectorAll('.block')[i].classList.remove('destroy')
				}
				if (block.children[0].classList[1] == 'black') {
					try {
						if (document.querySelector(`.y${+block.getAttribute('y') - 1}.x${+block.getAttribute('x') - 1}`)
							&& !document.querySelector(`.y${+block.getAttribute('y') - 1}.x${+block.getAttribute('x') - 1}`).children.length) {
							document.querySelector(`.y${+block.getAttribute('y') - 1}.x${+block.getAttribute('x') - 1}`).classList.add('select')
						}
						else if (document.querySelector(`.y${+block.getAttribute('y') - 1}.x${+block.getAttribute('x') - 1}`).children?.length
							&& document.querySelector(`.y${+block.getAttribute('y') - 2}.x${+block.getAttribute('x') - 2}`) &&
							!document.querySelector(`.y${+block.getAttribute('y') - 2}.x${+block.getAttribute('x') - 2}`).children.length
							&& !document.querySelector(`.y${+block.getAttribute('y') - 1}.x${+block.getAttribute('x') - 1}`).children[0].classList.contains('black')) {
							document.querySelector(`.y${+block.getAttribute('y') - 2}.x${+block.getAttribute('x') - 2}`).classList.add('select')
							document.querySelector(`.y${+block.getAttribute('y') - 2}.x${+block.getAttribute('x') - 2}`).classList.add('destroy')
							destroyedBlock = document.querySelector(`.y${+block.getAttribute('y') - 1}.x${+block.getAttribute('x') - 1}`)
						}

					} catch (e) {
						console.log(e)
					}
					try {
						if (document.querySelector(`.y${+block.getAttribute('y') - 1}.x${+block.getAttribute('x') + 1}`)
							&& !document.querySelector(`.y${+block.getAttribute('y') - 1}.x${+block.getAttribute('x') + 1}`).children.length) {
							document.querySelector(`.y${+block.getAttribute('y') - 1}.x${+block.getAttribute('x') + 1}`).classList.add('select')
						}
						else if (document.querySelector(`.y${+block.getAttribute('y') - 1}.x${+block.getAttribute('x') + 1}`).children.length
							&& document.querySelector(`.y${+block.getAttribute('y') - 2}.x${+block.getAttribute('x') + 2}`) &&
							!document.querySelector(`.y${+block.getAttribute('y') - 2}.x${+block.getAttribute('x') + 2}`).children.length
							&& !document.querySelector(`.y${+block.getAttribute('y') - 1}.x${+block.getAttribute('x') + 1}`).children[0].classList.contains('black')) {
							document.querySelector(`.y${+block.getAttribute('y') - 2}.x${+block.getAttribute('x') + 2}`).classList.add('select')
							document.querySelector(`.y${+block.getAttribute('y') - 2}.x${+block.getAttribute('x') + 2}`).classList.add('destroy')
							destroyedBlock = document.querySelector(`.y${+block.getAttribute('y') - 1}.x${+block.getAttribute('x') + 1}`)
						}
					} catch (e) {
						console.log(e)
					}
					try {
						if (document.querySelector(`.y${+block.getAttribute('y') + 1}.x${+block.getAttribute('x') + 1}`).children.length
							&& document.querySelector(`.y${+block.getAttribute('y') + 2}.x${+block.getAttribute('x') + 2}`) &&
							!document.querySelector(`.y${+block.getAttribute('y') + 2}.x${+block.getAttribute('x') + 2}`).children.length
							&& !document.querySelector(`.y${+block.getAttribute('y') + 1}.x${+block.getAttribute('x') + 1}`).children[0].classList.contains('black')) {
							document.querySelector(`.y${+block.getAttribute('y') + 2}.x${+block.getAttribute('x') + 2}`).classList.add('destroy')
							document.querySelector(`.y${+block.getAttribute('y') + 2}.x${+block.getAttribute('x') + 2}`).classList.add('select')
							destroyedBlock = document.querySelector(`.y${+block.getAttribute('y') + 1}.x${+block.getAttribute('x') + 1}`)
						}
					} catch (e) {
						throw e
					}
					try {
						if (document.querySelector(`.y${+block.getAttribute('y') + 1}.x${+block.getAttribute('x') - 1}`).children.length
							&& document.querySelector(`.y${+block.getAttribute('y') + 2}.x${+block.getAttribute('x') - 2}`) &&
							!document.querySelector(`.y${+block.getAttribute('y') + 2}.x${+block.getAttribute('x') - 2}`).children.length
							&& !document.querySelector(`.y${+block.getAttribute('y') + 1}.x${+block.getAttribute('x') - 1}`).children[0].classList.contains('black')) {
							document.querySelector(`.y${+block.getAttribute('y') + 2}.x${+block.getAttribute('x') - 2}`).classList.add('destroy')
							document.querySelector(`.y${+block.getAttribute('y') + 2}.x${+block.getAttribute('x') - 2}`).classList.add('select')
							destroyedBlock = document.querySelector(`.y${+block.getAttribute('y') + 1}.x${+block.getAttribute('x') - 1}`)
						}
					} catch (e) {
						throw e
					}

				}
				// ======================================== White figures
				else {
					if (document.querySelector(`.y${+block.getAttribute('y') + 1}.x${+block.getAttribute('x') - 1}`)
						&& !document.querySelector(`.y${+block.getAttribute('y') + 1}.x${+block.getAttribute('x') - 1}`).children.length) {
						document.querySelector(`.y${+block.getAttribute('y') + 1}.x${+block.getAttribute('x') - 1}`).classList.add('select')
					}
					if (document.querySelector(`.y${+block.getAttribute('y') + 1}.x${+block.getAttribute('x') + 1}`)
						&& !document.querySelector(`.y${+block.getAttribute('y') + 1}.x${+block.getAttribute('x') + 1}`).children.length) {
						document.querySelector(`.y${+block.getAttribute('y') + 1}.x${+block.getAttribute('x') + 1}`).classList.add('select')
					}
				}
				// ========================================== Click on the block
			} else if (block.classList.contains('select')) {
				if (block.classList.contains('destroy')) {
					destroyedBlock.innerHTML = ''
				}
				for (let i = 0; i < document.querySelectorAll('.block').length; i++) {
					document.querySelectorAll('.block')[i].classList.remove('select')
					document.querySelectorAll('.block')[i].classList.remove('destroy')
				}
				block.appendChild(document.querySelector(`.y${figureParams[1]}.x${figureParams[0]}`).children[0])
			}
		})
	}


}
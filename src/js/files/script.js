// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from './functions.js'
// Підключення списку активних модулів
import { flsModules } from './modules.js'

// Получаем все блоки и кнопки
const blocks = Array.from(document.querySelectorAll('.quiz-item'))
const completionText = document.getElementById('completion-text')

// Индекс текущего блока
let currentIndex = 0

// Функция для скрытия всех блоков и завершающего текста
const hideAllBlocks = () => {
	blocks.forEach(block => {
		block.style.display = 'none'
	})
	completionText.style.display = 'none'
}

// Функция для отображения текущего блока или завершающего текста
const showCurrentBlock = () => {
	if (currentIndex === blocks.length) {
		// Показываем завершающий текст
		hideAllBlocks()
		completionText.style.display = 'flex'
		document.querySelector('.wrapper-page').classList.add('_hide')
		document.querySelector('.wrapper').classList.add('_active')
	} else {
		// Показываем текущий блок
		hideAllBlocks()
		blocks[currentIndex].style.display = 'block'
		
		// Обработчики событий для кнопок внутри блока
		const buttons = blocks[currentIndex].querySelectorAll('button')
		buttons.forEach(button => {
			button.addEventListener('click', nextBlock)
		})
	}
}

// Функция для переключения на следующий блок
const nextBlock = () => {
	currentIndex++
	showCurrentBlock()
}

// Показываем первый блок
showCurrentBlock()

// Функция для проверки, долисталась ли страница до конца
function isPageFullyScrolled() {
	// Получаем высоту контента страницы
	const pageHeight = document.documentElement.scrollHeight

	// Получаем текущую позицию скролла по вертикали
	const scrollTop = window.pageYOffset || document.documentElement.scrollTop

	// Получаем высоту видимой области браузера
	const windowHeight =
		window.innerHeight || document.documentElement.clientHeight

	// Проверяем, достиг ли скролл до конца страницы
	return scrollTop + windowHeight >= pageHeight
}

// Функция для добавления активного класса к блоку
function addActiveClassToBlock() {
	const footer = document.querySelector('.footer__callback')

	// Добавляем активный класс, если страница долисталась до конца
	if (isPageFullyScrolled()) {
		footer.classList.remove('_active')
	} else {
		footer.classList.add('_active')
	}
}

// Обработчик события прокрутки страницы
window.addEventListener('scroll', addActiveClassToBlock)

setTimeout(() => {
	flsModules.popup.open('#popup')
}, 20000)

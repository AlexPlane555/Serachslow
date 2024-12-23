const searchInput = document.getElementById("search");
const resultsList = document.getElementById("results");
const reverseButton = document.getElementById("reverse-button");

let words = [];
let translations = [];

// Замените 'words.txt' на путь к вашему файлу
fetch('./js/words.txt')
  .then(response => response.text())
  .then(data => {
    const lines = data.split('\n'); // Разделяем на строки
    lines.forEach(line => {
      if (line.trim() !== "") { // Пропускаем пустые строки
        const parts = line.split(' - '); // Разделяем строку по " - "
        if (parts.length === 2) {
          words.push(parts[0].trim());
          translations.push(parts[1].trim());
        } else {
          console.error("Ошибка в строке:", line); // Выводим ошибку в консоль
        }
      }
    });
    // Сортируем слова в алфавитном порядке
    words.sort();
    // Рендерим начальный список слов после загрузки
    displayWords();
    // Теперь можно использовать слова и переводы
    searchInput.addEventListener("input", searchWords);
    reverseButton.addEventListener("click", reverseTranslation);
  })
  .catch(error => {
    console.error("Ошибка при загрузке файла:", error); // Выводим ошибку в консоль
    resultsList.innerHTML = "<p>Ошибка загрузки файла!</p>"; // Добавлено для отображения сообщения об ошибке пользователю.
  });

function displayWords() {
    resultsList.innerHTML = ""; // Очищаем список перед отображением
    words.forEach((word, index) => addWord(word, translations[index]));
}

function searchWords() {
  const searchTerm = searchInput.value.toLowerCase();
  resultsList.innerHTML = "";

  if (searchTerm === "") {
    displayWords(); // Используем функцию для отображения
  } else {
    words.forEach((word, index) => {
      if (word.toLowerCase().includes(searchTerm)) {
        addWord(word, translations[index]);
      }
    });
  }
}

function reverseTranslation() {
  resultsList.innerHTML = "";
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm === "") return;

  translations.forEach((translation, index) => {
    if (translation.toLowerCase().includes(searchTerm)) {
      addWord(translation, words[index]);
    }
  });
}

function addWord(word, translation) {
  const listItem = document.createElement("li");
  listItem.textContent = word + " - " + translation;
  resultsList.appendChild(listItem);
}

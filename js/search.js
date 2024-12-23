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
          console.error("Ошибка в строке:", line);
        }
      }
    });
    words.sort(); // Сортируем слова после загрузки
    displayWords(); // Отображаем слова после загрузки и сортировки
    searchInput.addEventListener("input", searchWords);
    reverseButton.addEventListener("click", reverseTranslation);
  })
  .catch(error => {
    console.error("Ошибка при загрузке файла:", error);
    resultsList.innerHTML = "<p>Ошибка загрузки файла!</p>";
  });

function displayWords() {
  resultsList.innerHTML = "";
  words.forEach((word, index) => addWord(word, translations[index]));
}

function searchWords() {
  const searchTerm = searchInput.value.toLowerCase();
  resultsList.innerHTML = "";
  if (searchTerm === "") {
    displayWords();
  } else {
    words.forEach((word, index) => {
      if (word.toLowerCase().includes(searchTerm)) {
        addWord(word, translations[index]);
      }
    });
  }
}

/*function reverseTranslation() {
  resultsList.innerHTML = "";
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm === "") return;

  translations.forEach((translation, index) => {
    if (translation.toLowerCase().includes(searchTerm)) {
      addWord(translation, words[index]);
    }
  });
}*/

function addWord(word, translation) {
  const listItem = document.createElement("li");
  listItem.textContent = word + " - " + translation;
  resultsList.appendChild(listItem);
}

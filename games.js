let allGames = [];

// JSON load
fetch("games.json")
  .then(res => res.json())
  .then(data => {
    allGames = data;
    console.log("Games loaded:", allGames);
  })
  .catch(err => console.error("Error loading games.json", err));

// Search function
function searchGames(query) {
  query = query.trim().toLowerCase();
  if (!query) return [];

  return allGames.filter(game =>
    game.title.toLowerCase().includes(query) ||
    game.tags.some(tag => tag.toLowerCase().includes(query))
  );
}

// Example: call this when user types
document.querySelector(".search-input").addEventListener("input", e => {
  const results = searchGames(e.target.value);
  console.log("Search results:", results); // test output

  const container = document.getElementById("searchResults");
  container.innerHTML = results.length ?
    results.map(game => `
        <div onclick="playGame(${game.id})">
          <img src="${game.img}" width="50">
          <span>${game.title}</span>
        </div>
      `).join("") :
    "<p style='color:white'>No games found</p>";
});

// Play Game + Recently Played
function playGame(id) {
  const game = allGames.find(g => g.id === id);
  if (!game) return;

  let recent = JSON.parse(localStorage.getItem("recentlyPlayed") || "[]");
  recent = recent.filter(g => g.id !== game.id);
  recent.unshift(game);
  if (recent.length > 6) recent.pop();
  localStorage.setItem("recentlyPlayed", JSON.stringify(recent));

  window.location.href = game.link;
}
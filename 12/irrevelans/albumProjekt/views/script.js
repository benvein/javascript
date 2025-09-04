document.addEventListener("DOMContentLoaded", () => {
    const albumList = document.getElementById("album-list");
    const addAlbumBtn = document.getElementById("add-album-btn");
    const albumFormSection = document.getElementById("album-form-section");
    const albumForm = document.getElementById("album-form");
    const formTitle = document.getElementById("form-title");
    const albumIdInput = document.getElementById("album-id");
    const artistInput = document.getElementById("artist");
    const titleInput = document.getElementById("title");
    const yearInput = document.getElementById("year");
    const cancelAlbumBtn = document.getElementById("cancel-album-btn");
    const songsSection = document.getElementById("songs-section");
    const songsList = document.getElementById("songs-list");
    const closeSongsBtn = document.getElementById("close-songs-btn");

    const addMultipleSongsSection = document.getElementById("add-multiple-songs-section");
    const multipleSongsForm = document.getElementById("multiple-songs-form");
    const multipleSongsContainer = document.getElementById("multiple-songs-container");
    const addSongRowBtn = document.getElementById("add-song-row-btn");
    const cancelMultipleSongsBtn = document.getElementById("cancel-multiple-songs-btn");

    let currentAlbumForMultipleSongs = null;

    async function fetchAlbums() {
        try {
            const res = await fetch("/albums");
            const albums = await res.json();
            albumList.innerHTML = "";
            albums.forEach(album => {
                const li = document.createElement("li");
                li.textContent = `${album.artist} - ${album.title} (${album.year})`;
                li.dataset.id = album.id;

                li.addEventListener("click", () => {
                    showSongs(album.id);
                });

                const updateBtn = document.createElement("button");
                updateBtn.textContent = "Edit";
                updateBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    openEditForm(album);
                });

                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete";
                deleteBtn.addEventListener("click", async (e) => {
                    e.stopPropagation();
                    if (confirm("Are you sure you want to delete this album?")) {
                        await deleteAlbum(album.id);
                    }
                });

                const addSongsBtn = document.createElement("button");
                addSongsBtn.textContent = "Add Songs";
                addSongsBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    openAddMultipleSongsForm(album.id);
                });

                li.appendChild(updateBtn);
                li.appendChild(deleteBtn);
                li.appendChild(addSongsBtn);

                albumList.appendChild(li);
            });
        } catch (error) {
            alert("Failed to load albums");
        }
    }

    function openAddMultipleSongsForm(albumId) {
        currentAlbumForMultipleSongs = albumId;
        addMultipleSongsSection.classList.remove("hidden");
        while (multipleSongsContainer.children.length > 1) {
            multipleSongsContainer.removeChild(multipleSongsContainer.lastChild);
        }
        const firstRow = multipleSongsContainer.children[0];
        firstRow.querySelector('input[name="title"]').value = "";
        firstRow.querySelector('input[name="duration"]').value = "";
    }

    addSongRowBtn.addEventListener("click", () => {
        const newRow = document.createElement("div");
        newRow.className = "song-input-row";
        newRow.innerHTML = `
            <label>Title:</label>
            <input type="text" name="title" required />
            <label>Duration (seconds):</label>
            <input type="number" name="duration" required />
            <button type="button" class="remove-song-btn">Remove</button>
        `;
        multipleSongsContainer.appendChild(newRow);

        const removeBtn = newRow.querySelector(".remove-song-btn");
        removeBtn.addEventListener("click", () => {
            multipleSongsContainer.removeChild(newRow);
        });
    });

    cancelMultipleSongsBtn.addEventListener("click", () => {
        addMultipleSongsSection.classList.add("hidden");
        currentAlbumForMultipleSongs = null;
    });

    multipleSongsForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!currentAlbumForMultipleSongs) {
            alert("No album selected for adding songs.");
            return;
        }
        const songRows = multipleSongsContainer.querySelectorAll(".song-input-row");
        const songsToAdd = [];
        for (const row of songRows) {
            const title = row.querySelector('input[name="title"]').value.trim();
            const duration = parseInt(row.querySelector('input[name="duration"]').value);
            if (!title || !duration) {
                alert("Please fill in all song fields.");
                return;
            }
            songsToAdd.push({ title, duration });
        }
        try {
            for (const song of songsToAdd) {
                const res = await fetch(`/albums/${currentAlbumForMultipleSongs}/songs`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(song),
                });
                if (!res.ok) throw new Error("Failed to add song");
            }
            addMultipleSongsSection.classList.add("hidden");
            showSongs(currentAlbumForMultipleSongs);
            currentAlbumForMultipleSongs = null;
        } catch (error) {
            alert(error.message);
        }
    });

    let currentAlbumId = null;
    async function showSongs(albumId) {
        currentAlbumId = albumId;
        try {
            const res = await fetch(`/albums/${albumId}/songs`);
            if (!res.ok) {
                throw new Error("Failed to fetch songs");
            }
            const songs = await res.json();
            songsList.innerHTML = "";
            if (songs.length === 0) {
                songsList.textContent = "No songs found for this album.";
            } else {
                songs.forEach(song => {
                    const li = document.createElement("li");
                    li.textContent = `${song.title} (${song.duration} sec)`;
                
                    const deleteBtn = document.createElement("button");
                    deleteBtn.textContent = "Delete";
                    deleteBtn.addEventListener("click", async (e) => {
                        e.stopPropagation();
                        if (confirm("Are you sure you want to delete this song?")) {
                            try {
                                const res = await fetch(`/songs/${song.id}`, { method: "DELETE" });
                                if (!res.ok) throw new Error("Failed to delete song");
                                showSongs(albumId);
                            } catch (error) {
                                alert(error.message);
                            }
                        }
                    });
                
                    li.appendChild(deleteBtn);
                    songsList.appendChild(li);
                });
                
            }
            songsSection.classList.remove("hidden");
        } catch (error) {
            alert(error.message);
        }
    }

    closeSongsBtn.addEventListener("click", () => {
        songsSection.classList.add("hidden");
        songsList.innerHTML = "";
    });

    const songForm = document.getElementById("song-form");
    const songTitleInput = document.getElementById("song-title");
    const songDurationInput = document.getElementById("song-duration");

    songForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const title = songTitleInput.value.trim();
        const duration = parseInt(songDurationInput.value);

        if (!title || !duration || !currentAlbumId) {
            alert("Please fill in all song fields and select an album.");
            return;
        }

        try {
            const res = await fetch(`/albums/${currentAlbumId}/songs`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, duration }),
            });
            if (!res.ok) throw new Error("Failed to add song");
            songTitleInput.value = "";
            songDurationInput.value = "";
            showSongs(currentAlbumId);
        } catch (error) {
            alert(error.message);
        }
    });

    addAlbumBtn.addEventListener("click", () => {
        formTitle.textContent = "Add Album";
        albumIdInput.value = "";
        artistInput.value = "";
        titleInput.value = "";
        yearInput.value = "";
        albumFormSection.classList.remove("hidden");
    });

    function openEditForm(album) {
        formTitle.textContent = "Edit Album";
        albumIdInput.value = album.id;
        artistInput.value = album.artist;
        titleInput.value = album.title;
        yearInput.value = album.year;
        albumFormSection.classList.remove("hidden");
    }

    cancelAlbumBtn.addEventListener("click", () => {
        albumFormSection.classList.add("hidden");
    });

    albumForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const id = albumIdInput.value;
        const artist = artistInput.value.trim();
        const title = titleInput.value.trim();
        const year = parseInt(yearInput.value);

        if (!artist || !title || !year) {
            alert("Please fill in all fields");
            return;
        }

        try {
            if (id) {
                const res = await fetch(`/albums/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ artist, title, year }),
                });
                if (!res.ok) throw new Error("Failed to update album");
            } else {
                const res = await fetch("/albums", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ artist, title, year }),
                });
                if (!res.ok) throw new Error("Failed to add album");
            }
            albumFormSection.classList.add("hidden");
            fetchAlbums();
        } catch (error) {
            alert(error.message);
        }
    });

    async function deleteAlbum(id) {
        try {
            const res = await fetch(`/albums/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete album");
            fetchAlbums();
        } catch (error) {
            alert(error.message);
        }
    }

    fetchAlbums();
});

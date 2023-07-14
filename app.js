document.addEventListener("DOMContentLoaded", function () {
  const Textcontain = document.getElementById("status");
  const Api = "https://api.lanyard.rest/v1/users/600278222428438559";
  const Ss = document.getElementById("song");
  const Pfp = document.getElementById("img");
  const At = document.getElementById("username");
  const Art = document.getElementById("artist");
  const Album = document.getElementById("link");
  const Pic = document.getElementById("pic")
  var modal = document.getElementById("myModal");

// Get the button that opens the modal


  const performSearch = () => {
    fetch(Api)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          Textcontain.textContent = data.error;
          console.log(data.error);
        } else {
          if (data.data.spotify) {
            const spotifyData = data.data.spotify;
            const song = spotifyData.song;
            const artist = spotifyData.artist;
            const status = data.data.discord_status;
            const pfp = spotifyData.album_art_url;
            const name = data.data.discord_user.username;
            const url = spotifyData.track_id;
            let color;

            if (status === "dnd") {
              color = 'red';
            } else if (status === "online") {
              color = 'green';
            } else if (status === "offline") {
              color = 'grey';
            } else if (status === "idle") {
              color = 'yellow';
            }


            Textcontain.textContent = `${status}`;
            Ss.textContent = `${song}`;
            Art.textContent = `By ${artist}`;
            At.textContent = `@${name}`;
            Pfp.src = `${pfp}`;
            Album.href = `https://open.spotify.com/track/${url}`;
             document.documentElement.style.setProperty('--status-color', color);

          } else {
            const status = data.data.discord_status;
            const name = data.data.discord_user.username;
            let color;

            if (status === "dnd") {
              color = 'red';
            } else if (status === "online") {
              color = 'green';
            } else if (status === "offline") {
              color = 'grey';
            } else if (status === "idle") {
              color = 'yellow';
            }

            document.documentElement.style.setProperty('--status-color', color);

            Textcontain.textContent = `${status}`;
            Ss.textContent = `Currently Not Listening To Any Song`;
            At.textContent = `@${name}`;
            Pfp.src = `./images/placeholder.png`;
            Art.textContent = `No songs playing...`;
            Album.href = `https://open.spotify.com`;
          }
        }
      })
      .catch((error) => {
        Textcontain.textContent = 'An error occurred while fetching the data.';
        console.log(error);
      });
  };

  performSearch();
});
// Get the modal
const imgs = ["1.jpeg", "2.jpg", "3.jpg", "4.jpeg", "5.jpeg","6.jpeg","download.jpeg", "You want the gold version!.jpeg", "Shiv shiv shiv.jpeg"];
let currIndex = 0;

function ShowImage(index) {
    currIndex = index;
    document.getElementById("Background").src = imgs[currIndex];
}

function Next() {
    currIndex = (currIndex + 1) % imgs.length;
    ShowImage(currIndex);
}

function Previous() {
    currIndex = (currIndex - 1 + imgs.length) % imgs.length;
    ShowImage(currIndex);
}
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowRight") {
      Next(); // Go to next image or video
    } else if (event.key === "ArrowLeft") {
      Previous(); // Go to previous image or video
    }
  });
  
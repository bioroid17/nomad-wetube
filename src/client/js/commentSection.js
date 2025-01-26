const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteBtns = document.querySelectorAll(".delete-comment");

const videoId = videoContainer.dataset.id;
let timeoutId = null;

const deleteComment = async (event) => {
  const li = event.target.parentElement;
  const commentId = li.dataset.id;
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ commentId }),
  });
  if (response.status === 200) {
    li.remove();
  }
  if (response.status === 401) {
    let div = li.querySelector(".comment-error");
    if (!div) {
      div = document.createElement("div");
      div.className = "comment-error";
      div.innerText = "You're not authorized to delete this comment.";
      div.style.color = "red";
      li.appendChild(div);
    } else {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    timeoutId = setTimeout(() => {
      div.remove();
    }, 3000);
  }
};

const addComment = (text, id, username) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const div1 = document.createElement("div");
  div1.className = "comment__data";
  div1.innerText = `${username + " • " + String(new Date()).slice(4, 24)}`;
  const div2 = document.createElement("div");
  div2.className = "comment";
  div2.innerText = ` ${text}`;
  const span = document.createElement("span");
  span.className = "delete-comment";
  span.innerText = "❌";
  span.addEventListener("click", deleteComment);
  newComment.appendChild(icon);
  newComment.appendChild(div1);
  newComment.appendChild(span);
  newComment.appendChild(div2);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newComment, username } = await response.json();
    addComment(text, newComment._id, username);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", deleteComment);
  });
}

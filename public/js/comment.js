// create new comment
const newComment = async (e) => {
  e.preventDefault();

  // capture the content from the new comment form
  const contents = document.getElementById("commentContent").value;
  const post_id = document.getElementById("postId").value;

  if (contents) {
    await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({
        // add contents to be inserted into the DB
        content: contents,
        post_id: post_id,
      }),
      headers: { "Content-Type": "application/json" },
    });

    document.location.reload();
  } else {
    alert("need content");
  }
};

// create event listener for the submit button to run newPost
document.getElementById("newComment").addEventListener("submit", newComment);

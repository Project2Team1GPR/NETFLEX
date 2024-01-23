const updatePost = async (e) => {
  e.preventDefault();

  // capture the content from the new post form
  const postId = document.getElementById("postId").value;

  const title = document.getElementById("postTitle").value;
  const contents = document.getElementById("postContent").value;

  if (title && contents) {
    await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify({
        // add contents to be inserted into the DB
        title: title,
        contents: contents,
      }),
      headers: { "Content-Type": "application/json" },
    });

    document.location.replace("/dashboard");
  } else {
    alert("need content & title");
  }
};

// create event listener for the submit button to run newPost
document.getElementById("update-post").addEventListener("submit", updatePost);

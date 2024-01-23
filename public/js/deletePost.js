const deletePost = async (e) => {
  e.preventDefault();

  const postId = document.getElementById("postId").value;

  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to delete post.");
  }
};

document.getElementById("delete").addEventListener("click", deletePost);

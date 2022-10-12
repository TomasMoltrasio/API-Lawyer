const fs = require("fs");
const postService = {};
const urlJson = "./json/posts.json";

postService.getPosts = (req, res) => {
  fs.readFile(urlJson, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message });
    } else {
      res.status(200).send(JSON.parse(data));
    }
  });
};

postService.getPost = (req, res) => {
  fs.readFile(urlJson, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message });
    } else {
      const post = JSON.parse(data).find(
        (post) => String(post.id) === req.params.id
      );
      if (post) {
        res.status(200).send(post);
      } else {
        res.status(404).send({ message: "Post not found" });
      }
    }
  });
};

postService.getPostsByTitle = (req, res) => {
  fs.readFile(urlJson, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message });
    } else {
      const posts = JSON.parse(data).filter((post) =>
        post.title.toLowerCase().includes(req.params.title.toLowerCase())
      );
      if (posts.length > 0) {
        res.status(200).send(posts);
      } else {
        res.status(404).send({ message: "Posts not found" });
      }
    }
  });
};

postService.createPost = (req, res) => {
  fs.readFile(urlJson, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message });
    } else {
      const posts = JSON.parse(data);
      const post = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content,
        description: req.body.description,
        date: new Date(),
      };
      posts.push(post);
      fs.writeFile(urlJson, JSON.stringify(posts), (err) => {
        if (err) {
          res.status(500).send({ message: err.message });
        } else {
          res.status(201).send(post);
        }
      });
    }
  });
};

postService.updatePost = (req, res) => {
  fs.readFile(urlJson, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message });
    } else {
      const posts = JSON.parse(data);
      const post = posts.find((post) => String(post.id) === req.params.id);
      if (post) {
        post.title = req.body.title;
        post.content = req.body.content;
        post.description = req.body.description;
        fs.writeFile(urlJson, JSON.stringify(posts), (err) => {
          if (err) {
            res.status(500).send({ message: err.message });
          } else {
            res.status(200).send(post);
          }
        });
      } else {
        res.status(404).send({ message: "Post not found" });
      }
    }
  });
};

postService.deletePost = (req, res) => {
  fs.readFile(urlJson, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message });
    } else {
      const posts = JSON.parse(data);
      const post = posts.find((post) => String(post.id) === req.params.id);
      if (post) {
        const index = posts.indexOf(post);
        posts.splice(index, 1);
        fs.writeFile(urlJson, JSON.stringify(posts), (err) => {
          if (err) {
            res.status(500).send({ message: err.message });
          } else {
            res.status(200).send({ message: "Post deleted" });
          }
        });
      } else {
        res.status(404).send({ message: "Post not found" });
      }
    }
  });
};

postService.deleteAll = (req, res) => {
  fs.readFile(urlJson, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message });
    } else {
      const posts = JSON.parse(data);
      if (posts.length > 0) {
        fs.writeFile(urlJson, JSON.stringify([]), (err) => {
          if (err) {
            res.status(500).send({ message: err.message });
          } else {
            res.status(200).send({ message: "All posts deleted" });
          }
        });
      } else {
        res.status(404).send({ message: "Posts not found" });
      }
    }
  });
};

module.exports = postService;

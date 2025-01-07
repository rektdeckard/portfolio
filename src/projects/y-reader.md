---
title: "yReader"
description: "A modern Hacker News desktop client"
url: "https://github.com/rektdeckard/y-reader"
year: 2022
tags: ["hacker news", "frontend", "dektop", "rust", "oss"]
---

import StylizedImage from "@components/StylizedImage.astro";
import phosphorSiteImage from "@assets/images/phosphor_site.png";

## The gap

If you're reading this, you have probably found yourself on [Hacker News](https://news.ycombinator.com) once or twice. It's a simple, beloved site where users share tech-related links and <em>always<sup><a id="ref-1" href="#footnote-1">1</a></sup> have civil discussions about them</em>. But the UX is dated, and it is not so enjoyable to browse via the official website.

I am far from the first person to come to this conclusion, as there are literally thousands of <abbr title="Hacker News">HN</abbr> clients out there. But I took this opportunity to explore cross-platform graphical application development in Rust, and resolved to write my own client.

## Decisions

The Rust community has been asking itself for a while now, ["Are we GUI yet?"](https://www.areweguiyet.com)
and at this point, the answer is decidedly YES. I decided to go with [egui](https://github.com/emilk/egui): an opinionated, declarative, immediate-mode GUI library with backends for both web and native.

        <figure>
          <video autoPlay loop width="100%">
            <source src={y_reader_video_hevc} type="video/mp4" />
            <source src={y_reader_video} type="video/mp4" />
          </video>
          <figcaption>YReader Hacker News client</figcaption>
        </figure>

## Limitations and workarounds

The Hacker News website is impressive in this day and age, in that it still [runs on a single, on-prem server](https://news.ycombinator.com/item?id=16076041) and has a very simple architecture. But the official Hacker News API is not great, and is ["essentially a dump of \[their\] in-memory data structures"](https://github.com/HackerNews/API#design) — making certain common actions (like listing entities) quite cumbersome. You cannot fetch a list of posts; instead, you fetch a list of post IDs, then fetch each post in separate requests. Same goes for comments and other entities.

This led me to implement a super-parallelized client that uses an absurd number of threads (one per entity) to hydrate the UI concurrently and efficiently, all at 60FPS.

```rust
impl YReader {
    fn init(&self) {
        let data_top = Arc::clone(&self.data);
        thread::spawn(move || loop {
            let client = JsonClient::new();
            let ids = client.top_stories();
            if let Ok(ids) = ids {
                let page;
                {
                    let data = data_top.lock().unwrap();
                    page = data.top_page;
                }
                for (idx, id) in ids.iter().take(WINDOW * (page + 1)).enumerate() {
                    if let Ok(item) = client.item(*id) {
                        let mut data = data_top.lock().unwrap();
                        data.top.insert(idx, item);
                    }
                }
                let mut data = data_top.lock().unwrap();
                data.top_ids = ids;
                data.top_page = (data.top_page + 1) % 2;
            }
            thread::sleep(Duration::from_secs(REFETCH_DELAY_SECONDS));
        });

        let data_new = Arc::clone(&self.data);
        thread::spawn(move || loop {
            let client = JsonClient::new();
            let ids = client.new_stories();
            if let Ok(ids) = ids {
                let page;
                {
                    let data = data_new.lock().unwrap();
                    page = data.new_page;
                }
                for (idx, id) in ids.iter().take(WINDOW * (page + 1)).enumerate() {
                    if let Ok(item) = client.item(*id) {
                        let mut data = data_new.lock().unwrap();
                        data.new.insert(idx, item);
                    }
                }
                let mut data = data_new.lock().unwrap();
                data.new_ids = ids;
                data.new_page = (data.new_page + 1) % 2;
            }
            thread::sleep(Duration::from_secs(REFETCH_DELAY_SECONDS));
        });
    }
}
```

## Still to come

While the client is already a great way to browse the content, I have yet to implement a few features before considering this project ready for public consumption:

- User authentication
- Post and comment submission/editing
- Voting
- Job boards

## Footnotes

<ol>
  <li>
    <small id="footnote-1">
      Not always. <a href="#ref-1">[ref]</a>
    </small>
  </li>
</ol>

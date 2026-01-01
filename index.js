const http = require('http');

const port = process.env.PORT || 3000;

const pages = [
  {
    label: 'Page 1',
    heading: 'Origins & Name',
    summary:
      'Cain arrives as the son conceived with Eve\u2019s remembrance of God\u2019s help. His name, meaning \"Here he is,\" is stitched to the warning in Genesis that enmity will walk the world.',
    detail:
      'Genesis 4:1 records Eve declaring \u201cWith the help of the Lord I have brought forth a man,\u201d and Genesis 3:15 foreshadows continued conflict; this page sets Cain as the first child woven into the aftermath of the Fall.'
  },
  {
    label: 'Page 2',
    heading: 'Lineage & Contrast',
    summary:
      'Cain becomes the archetype of rebellion, while Abel and Seth point toward righteousness. 1 John 3:12 explicitly says Cain belonged to the evil one and murdered his brother because of evildoing.',
    detail:
      'The genealogy through Seth leads toward the blessed seed, while Cain\u2019s corrupted line grows through violence and worldly achievements. The story fast-forwards through Abraham, Isaac, Jacob, and Judah, showing Judah\u2019s heart of sacrifice echoing back to Cain\u2019s violent choice.'
  },
  {
    label: 'Page 3',
    heading: 'Judah\u2019s Redemption',
    summary:
      'Judah mirrors Cain by engaging in dark plots, yet he is also the first to offer himself for his brother, foreshadowing the promised redeemer.',
    detail:
      'From Genesis 44 we see Judah ready to stay a slave instead of Benjamin, contrasting Cain\u2019s murderous heart. Judah\u2019s line leads through Perez, Hezron, Ram, and eventually to David, reinforcing how even a fallible line can carry God\u2019s purpose.'
  },
  {
    label: 'Page 4',
    heading: 'Questions & Corruption',
    summary:
      'Cain\u2019s descendants build cities and develop arts, yet the bloodline remains marred by violence. The text raises enduring questions about Cain\u2019s wife, the mark, and the presence of others.',
    detail:
      'Genesis 6:1-2 introduces the Watchers, sowing further corruption. If Seth\u2019s line is blessed and Cain\u2019s corrupted, then it\u2019s reasonable to see Cain\u2019s descendants joining with fallen angels to produce Nephilim, while God\u2019s people await the promised seed.'
  }
];

const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Investigate Cain</title>
    <style>
      :root {
        font-family: 'Inter', system-ui, sans-serif;
        color: #f4f1ea;
        background: #050308;
      }

      body {
        margin: 0;
        min-height: 100vh;
        background: radial-gradient(circle at top right, rgba(122, 0, 255, 0.35), transparent 45%),
          linear-gradient(180deg, #050308 0%, #0f0611 55%, #1d0c22 100%);
      }

      main {
        padding: 3rem 1rem 4rem;
        max-width: 960px;
        margin: 0 auto;
      }

      h1 {
        font-size: clamp(2.5rem, 3vw, 3.5rem);
        margin: 0;
        color: #f3c677;
      }

      .subhead {
        margin-top: 0.5rem;
        color: #c9c7b5;
        max-width: 60ch;
      }

      .pages {
        margin-top: 2.5rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1rem;
      }

      .page-tab {
        border-radius: 999px;
        padding: 0.6rem 1.4rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
        cursor: pointer;
        transition: background 0.2s ease, color 0.2s ease;
        background: rgba(255, 255, 255, 0.03);
        text-align: center;
      }

      .page-tab.active {
        color: #050308;
        background: #f3c677;
        border-color: transparent;
      }

      .panel {
        margin-top: 2rem;
        padding: 2rem;
        border-radius: 1.4rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
      }

      .panel h2 {
        margin-top: 0;
        color: #ffede0;
      }

      .panel .summary {
        font-size: 1.1rem;
        color: #e6def8;
        margin-bottom: 1rem;
      }

      .panel .detail {
        color: #ccc7d4;
        line-height: 1.6;
      }

      .panel span.tag {
        display: inline-flex;
        background: rgba(243, 198, 119, 0.2);
        padding: 0.25rem 0.75rem;
        border-radius: 999px;
        font-size: 0.75rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: #f3c677;
      }

      @media (min-width: 960px) {
        .panel {
          display: flex;
          gap: 2rem;
          align-items: flex-start;
        }

        .panel-content {
          flex: 1;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <p class="subhead">
        Investigate Cain, the first child of Eve, by moving through the story of his birth, choices,
        and the longer lineage that traces the promised seed.
      </p>
      <h1>Investigate Cain</h1>
      <div class="pages" role="tablist">
        ${pages
          .map(
            (page, index) => `
          <button class="page-tab${index === 0 ? ' active' : ''}" role="tab" data-index="${index}">
            ${page.label}
          </button>`
          )
          .join('')}
      </div>
      <section class="panel" id="panel">
        <div class="panel-content">
          <span class="tag" id="panelTag">${pages[0].label}</span>
          <h2 id="panelHeading">${pages[0].heading}</h2>
          <p class="summary" id="panelSummary">${pages[0].summary}</p>
          <p class="detail" id="panelDetail">${pages[0].detail}</p>
        </div>
      </section>
    </main>
    <script>
      const pagesData = ${JSON.stringify(pages)};
      const tabs = document.querySelectorAll('.page-tab');

      tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
          const idx = Number(tab.dataset.index);
          const selected = pagesData[idx];
          document.getElementById('panelTag').textContent = selected.label;
          document.getElementById('panelHeading').textContent = selected.heading;
          document.getElementById('panelSummary').textContent = selected.summary;
          document.getElementById('panelDetail').textContent = selected.detail;

          tabs.forEach((t) => t.classList.remove('active'));
          tab.classList.add('active');
        });
      });
    </script>
  </body>
</html>
`;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


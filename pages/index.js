import { useState, useEffect } from "react"
import styles from "../styles/Home.module.css"

const randIndex = (items) => Math.floor(Math.random() * items.length)
const fullLicenseName = (img) => {
  const license = img.license
  const version = img.license_version

  if (license) {
    return license.toLowerCase() === "cc0"
      ? `${license.toUpperCase()} ${version}`
      : `CC ${license.toUpperCase()} ${version}`
  }
  return ""
}

const getPic = fetch(
  "https://api-dev.creativecommons.engineering/v1/images?q=light+leak&format=json&page_size=200&&license=cc0,pdm,by,by-sa,by-nc"
)
  .then((res) => res.json())
  .then((json) => json.results)

export default function Home() {
  const [pic, setPic] = useState(null)
  const [pics, setPics] = useState([])
  useEffect(() => {
    getPic.then(setPics).then(setPic).catch(console.error)
  }, [])

  useEffect(() => {
    setPic(pics[randIndex(pics)])
  }, [pics])

  const refreshImg = () => {
    setPic(pics[randIndex(pics)])
  }

  return (
    <>
      <div className="page">
        <div className="masthead">
          {/* <img src="https://live.staticflickr.com/4270/34302933444_42c27ace98_b.jpg" /> */}
        </div>

        <aside className="info-gutter left">
          <div>
            {pic && (
              <>
                <p className="img-extra">
                  Random image from{" "}
                  <a href="https://search.creativecommons.org">CC Search</a> for
                  the search term <i>light leak:</i>
                </p>
                <figure className="img-wrap">
                  <img alt={pic.title} className="funbox" src={pic.url} />

                  <div className="img-meta">
                    <figcaption>
                      <a href={pic.foreign_landing_url}>{pic.title}</a> by{" "}
                      <a href={pic.creator_url}>{pic.creator}</a>.<br />
                      Marked as{" "}
                      <a href={pic.license_url}>{fullLicenseName(pic)}</a>.
                    </figcaption>

                    <button className="refresh-icon" onClick={refreshImg}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    </button>
                  </div>
                </figure>
              </>
            )}
          </div>
        </aside>
        <main className="content">
          <h1>
            zack krida is remotely building software for distributed teams.
          </h1>
          <p>
            currently{" "}
            <a href="https://twitter.com/creativecommons">@creativecommons</a> /{" "}
            <a href="https://twitter.com/cc_opensource">@cc_opensource</a>
          </p>
          <p>
            Hi there, i'm Zack (he/him). I'm currently a front-end engineer and
            open-source maintainer at{" "}
            <a href="https://creativecommons.org">Creative Commons.</a>
          </p>
          <p>
            Since <b>June</b> I've been working at Creative Commons on two
            critical projects:
          </p>
          <dl>
            <dt>CC Search</dt>
            <dd>An exporable, digital commons for CC-licensed works.</dd>
            <dt>Vocabulary</dt>
            <dd>An open-source design system powering the commons.</dd>
          </dl>
          <p>
            Previously i spent 3 years working on projects using typescript,
            node.js, graphql, and postgres.
          </p>
          <p>
            i got my start in web development from neopets and myspace. after a
            several year break i came back to software development and fell in
            love with modern javascript.
          </p>
          <hr />
        </main>
        <aside className="info-gutter right">
          <div>
            {/* <h2>look, a sidebar!</h2> */}
            <p>
              <span className="notice">notice</span>
              i'm currently re-building my personal website in the open. This
              version was made on <b>October 10th 2020.</b>
            </p>
            <p>Coming soon:</p>
            <ul>
              <li>blog</li>
              <li>photos</li>
              <li>other pages :)</li>
            </ul>
          </div>
        </aside>
        <footer className="footer">
          copyleft zack krida. no rights reserved.
          <nav>CV</nav>
        </footer>
      </div>
    </>
  )
}

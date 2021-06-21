/* eslint-disable react/prop-types */
import React from "react"
import { Link } from "react-router-dom"
import ReactHtmlParser from "react-html-parser"

export default function SectionBucket(props) {
  const { section } = props
  return (
    <div className="member-main-section">
      <div className="member-head">
        {section.title_h2 && <h2>{section.title_h2}</h2>}
        {section.description && <p>{section.description}</p>}
      </div>
      <div className="member-section">
        {section.buckets?.map((bucket) => (
          <div className="content-section" key={bucket.title_h3}>
            {bucket.icon && <img src={bucket.icon.url} alt="bucket icon" />}

            {bucket.title_h3 ? <h3>{bucket.title_h3}</h3> : ""}
            {bucket.description && ReactHtmlParser(bucket.description)}
            {bucket.call_to_action.title ? (
              <Link
                to={
                  bucket.call_to_action.href ? bucket.call_to_action.href : "#"
                }
              >
                {`${bucket.call_to_action.title} -->`}
              </Link>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

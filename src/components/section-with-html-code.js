/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import React from "react"
import ReactHtmlParser from "react-html-parser"

export default function SectionWithHtmlCode(props) {
  const { embedObject } = props
  if (embedObject.html_code_alignment === "Left") {
    return (
      <div className="contact-page-section max-width">
        <div className="contact-page-content">
          {embedObject.title && <h1>{embedObject.title}</h1>}
          {embedObject.description && ReactHtmlParser(embedObject.description)}
        </div>
        <div className="contact-page-form">
          {embedObject.html_code && ReactHtmlParser(embedObject.html_code)}
        </div>
      </div>
    )
  }
  return (
    <div className="contact-maps-section max-width">
      <div className="maps-details">
        {ReactHtmlParser(embedObject.html_code)}
      </div>
      <div className="contact-maps-content">
        {embedObject.title ? <h2>{embedObject.title}</h2> : ""}
        {embedObject.description && ReactHtmlParser(embedObject.description)}
      </div>
    </div>
  )
}

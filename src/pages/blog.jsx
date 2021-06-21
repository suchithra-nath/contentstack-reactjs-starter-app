/* eslint-disable react/prop-types */

import React from "react"

import moment from "moment"
import { Link } from "react-router-dom"
import ReactHtmlParser from "react-html-parser"
import Stack from "../sdk/entry"
import Layout from "../components/layout"
import ArchiveRelative from "../components/archive-relative"
import RenderComponents from "../components/render-components"

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      entry: undefined,
      blogList: [],
      archived: [],
      header: undefined,
      footer: undefined,
      error: {
        errorStatus: false,
        errorCode: undefined,
        errorData: undefined,
      },
    }
  }

  async componentDidMount() {
    try {
      const { location } = this.props
      const blog = await Stack.getEntryByUrl("page", location.pathname)
      const result = await Stack.getEntry("blog_post", [
        "author",
        "related_post",
      ])
      const header = await Stack.getEntry(
        "header",
        "navigation_menu.page_reference"
      )
      const footer = await Stack.getEntry("footer")

      const archive = []
      const blogLists = []
      result[0].forEach((blogs) => {
        if (blogs.is_archived) {
          archive.push(blogs)
        } else {
          blogLists.push(blogs)
        }
      })

      this.setState({
        entry: blog[0],
        header: header[0][0],
        footer: footer[0][0],
        blogList: blogLists,
        archived: archive,
        error: { errorStatus: false },
      })
    } catch (error) {
      this.setState({
        error: { errorStatus: true, errorCode: 404, errorData: error },
      })
    }
  }

  render() {
    const { header, footer, entry, error, archived, blogList } = this.state
    const { history } = this.props

    if (!error.errorStatus && entry) {
      return (
        <Layout
          header={header}
          footer={footer}
          seo={entry.seo}
          activeTab="Blog"
        >
          <RenderComponents pageComponents={entry.page_components} blogsPage />
          <div className="blog-container">
            <div className="blog-column-left">
              {blogList?.map((bloglist) => (
                <div className="blog-list" key={bloglist.title}>
                  {bloglist.featured_image && (
                    <Link to={bloglist.url}>
                      <img
                        alt="blog img"
                        className="blog-list-img"
                        src={bloglist.featured_image.url}
                      />
                    </Link>
                  )}
                  <div className="blog-content">
                    {bloglist.title && (
                      <Link to={bloglist.url}>
                        <h3>{bloglist.title}</h3>
                      </Link>
                    )}
                    <p>
                      {moment(bloglist.date).format("ddd, MMM D YYYY")},{" "}
                      <strong>{bloglist.author[0].title}</strong>
                    </p>
                    {bloglist.body &&
                      ReactHtmlParser(bloglist.body.slice(0, 300))}
                    {bloglist.url ? (
                      <Link to={bloglist.url}>
                        <span>{"Read more -->"}</span>
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="blog-column-right">
              {entry.page_components[1].widget && (
                <h2>{entry.page_components[1].widget.title_h2} </h2>
              )}
              <ArchiveRelative blogs={archived} />
            </div>
          </div>
        </Layout>
      )
    }
    if (error.errorStatus) {
      history.push("/error", [error])
    }
    return ""
  }
}

export default Blog

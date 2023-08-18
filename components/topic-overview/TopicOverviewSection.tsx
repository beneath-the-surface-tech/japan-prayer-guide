import Link from "next/link"
import { Card, Container, Row, Col, Image } from "react-bootstrap"

interface TopicOverviewProps {
  title: string
  links: string[]
  section: string
  labels: string[]
}

export const TopicOverviewSection = ({ title, links, labels, section }: TopicOverviewProps) => {
  return (
    <>
      <section>
        <Container id={section} className="no-max-container mt-4 mt-md-4">
          <h1 className="topic-nav-section-title text-primary pt-4 px-1 px-md-2 mb-0">{title}</h1>
        </Container>
        <Container className="bottom-grey-border px-4 pt-1 no-max-container pb-5">
          <Row xl={3} lg={3} md={2} sm={2} xs={2} className="d-flex">
            {labels.map((element, idx) => {
              // Special if statement for conference, the 'else' will be removed for final
              if ((idx === 0 && section === "culture") || (idx === 2 && section === "church")) {
                return (
                  <Col key={element + idx} className="d-flex justify-content-center px-0 px-sm-1 px-md-2">
                    <Link href={`/topics/${links[idx].toLowerCase()}`} className="text-decoration-none">
                      <Card className="topic-nav-card mx-1 my-3">
                        <Image
                          src={`/photos/topic-nav/${section}/${links[idx]}.png`}
                          alt={""}
                          style={{ aspectRatio: 1.772, objectFit: "cover", width: "100%" }}
                        />
                        <Card.Body className="d-flex topic-nav-card-title p-0">
                          <p className="my-0">{element}</p>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                )
              } else {
                return (
                  <Col key={element + idx} className="d-flex justify-content-center px-0 px-sm-1 px-md-2">
                    <Link href={""} className="text-decoration-none position-relative">
                      <Card className="topic-nav-card mx-1 my-3">
                        <div
                          className="position-relative"
                          style={{ width: "fit-content", height: "fit-content", borderRadius: "8px 8px 0px 0px" }}
                        >
                          <Image
                            src={`/photos/topic-nav/${section}/placeholder.png`}
                            alt={""}
                            style={{
                              aspectRatio: 1.772,
                              objectFit: "cover",
                              width: "100%",
                              borderRadius: "4px 4px 0px 4px",
                            }}
                          />
                          <div
                            style={{
                              zIndex: 2,
                              top: 0,
                              cursor: "not-allowed",
                              backgroundColor: "#727C96",
                              borderRadius: "10px 10px 0px 0px",
                            }}
                            className="position-absolute w-100 h-100 opacity-75"
                          ></div>
                        </div>
                        <Card.Body className="d-flex topic-nav-card-title p-0" style={{ cursor: "not-allowed" }}>
                          <p className="m-0 text-grey-6">{element}</p>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                )
              }
            })}
          </Row>
        </Container>
      </section>
    </>
  )
}

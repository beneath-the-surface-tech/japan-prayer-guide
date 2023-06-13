import React from "react"
import { Container, Card } from "react-bootstrap"
import { FaPrayingHands } from "react-icons/fa"
import { IconContext } from "react-icons/lib"
import { BsDownload } from "react-icons/bs"

interface summaryProps {
  prayerPoints: string[]
  title: string
}

export default function PrayerSummary({ prayerPoints, title }: summaryProps) {
  return (
    <Container data-testid={"prayer-summary-container"} className="d-flex px-6 justify-content-start">
      <Card className="my-4 shadow" style={{ maxWidth: "400px" }}>
        <Card.Body>
          <Card.Text
            data-testid={"prayer-summary-title"}
            className="text-primary px-2 py-3 fs-4 fst-italic border-bottom border-grey d-flex justify-content-between align-items-center"
          >
            {title}
            <IconContext.Provider value={{ size: "20px" }}>
              <BsDownload className="text-secondary fw-bold" style={{ cursor: "pointer" }}></BsDownload>
            </IconContext.Provider>
          </Card.Text>
          <ul className="fs-5" data-testid={"prayer-summary-points"}>
            {prayerPoints.map((point: string, idx: number) => (
              <li key={idx + point} className="my-3 fs-6">
                {point}
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </Container>
  )
}

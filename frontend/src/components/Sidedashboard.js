import React from 'react'
import { Sidenav,Nav } from 'rsuite'
const Sidedashboard = () => {
  return (
    <Sidenav appearance="subtle">
    <Sidenav.Body>
      <Nav>
        <Nav.Item eventKey="1" active>
          Dashboard
        </Nav.Item>
        <Nav.Item eventKey="2">
          User Group
        </Nav.Item>
        <Nav.Menu eventKey="3" title="Advanced">
          <Nav.Item eventKey="3-1">Geo</Nav.Item>
          <Nav.Item eventKey="3-2">Devices</Nav.Item>
          <Nav.Item eventKey="3-3">Loyalty</Nav.Item>
          <Nav.Item eventKey="3-4">Visit Depth</Nav.Item>
        </Nav.Menu>
        <Nav.Menu eventKey="4" title="Settings">
          <Nav.Item eventKey="4-1">Applications</Nav.Item>
          <Nav.Item eventKey="4-2">Channels</Nav.Item>
          <Nav.Item eventKey="4-3">Versions</Nav.Item>
          <Nav.Menu eventKey="4-5" title="Custom Action">
            <Nav.Item eventKey="4-5-1">Action Name</Nav.Item>
            <Nav.Item eventKey="4-5-2">Action Params</Nav.Item>
          </Nav.Menu>
        </Nav.Menu>
      </Nav>
    </Sidenav.Body>
    <Sidenav.Toggle />
  </Sidenav>
  )
}

export default Sidedashboard
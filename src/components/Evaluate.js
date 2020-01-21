import React from "react";

class Evaluate extends React.Component {
  constructor(props) {
    super(props);

  }
  
  render() {
    return (
      <div id="evaluate">
        <table>
          <tr>
            <th>
              Tender Name
            </th>
            <th>
              Hash
            </th>
          </tr>
          <tr>
            <td>
            Steel Pipes
            </td>
            <td>
            86c3df17316512b61f6c2834ed8f935c806f5246c9ecece178d2132c7ae12d00
            </td>
          </tr>
          {/* <tr>
            <td>
            Gas
            </td>
            <td>
            24f8e9c8b3633fd6ef43a00955ff04d6ca8e7420c8882b0fbf32dd9ac827d4f7
            </td>
          </tr> */}
        </table>
        <table>
          <tr>
            <th>
              Bidder
            </th>
            <th>
              Bidding amount
            </th>
            <th>
              Open Documents
            </th>
            <th>
              Evaluate
            </th>
          </tr>
          <tr>
            <td>
              TATA Steel Pipes
            </td>
            <td>
              25,000
            </td>
            <td>
              <a href="#">Documents</a>
            </td>
            <td>
              <button id="accept">Accept</button>
            </td>
          </tr>
          <tr>
            <td>
              bruh
            </td>
            <td>
              32,000
            </td>
            <td>
              <a href="#">Documents</a>
            </td>
            <td>
              <button id="accept">Accept</button>
            </td>
          </tr>
          <tr>
            <td>
              lol
            </td>
            <td>
              29,803
            </td>
            <td>
              <a href="#">Documents</a>
            </td>
            <td>
              <button id="accept">Accept</button>
            </td>
          </tr>
        </table>
      </div>
    )
  }
}

export default Evaluate
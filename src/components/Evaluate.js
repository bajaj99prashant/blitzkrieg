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
              Hash
            </th>
            <th>
              Tender Name
            </th>
          </tr>
          <tr>
            <td>
            86c3df17316512b61f6c2834ed8f935c806f5246c9ecece178d2132c7ae12d00
            </td>
            <td>
              Steel Pipes
            </td>
          </tr>
          <tr>
            <td>
            24f8e9c8b3633fd6ef43a00955ff04d6ca8e7420c8882b0fbf32dd9ac827d4f7
            </td>
            <td>
              Gas
            </td>
          </tr>
        </table>
      </div>
    )
  }
}

export default Evaluate
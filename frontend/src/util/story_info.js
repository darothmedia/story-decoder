const StoryInfo = storyData => (
  <div className="wrapper" id="infowrapper">
    <h1>Your Story:</h1>
    <h2>ID: {storyData.storyID}</h2>
    <table>
      <tbody>
      <tr>
        <td>
          Title:
        </td>
        <td>
          {storyData.title ? storyData.title : null}
        </td>
      </tr>
      <tr>
        <td>
          Creator:
        </td>
        <td>
          {storyData.creator ? storyData.creator : null}
        </td>
      </tr>
      {storyData.writers ? storyData.writers.map((writer, idx) => (
        <tr key={idx}>
          <td>{idx === 0 ? "Writers:" : null}</td>
          <td>{writer}</td>
        </tr>
      )) : null}
      </tbody>
    </table>
  </div>
) 

export default StoryInfo
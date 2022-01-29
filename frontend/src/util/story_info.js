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
          {storyData.title}
        </td>
      </tr>
      <tr>
        <td>
          Creator:
        </td>
        <td>
          {storyData.creator}
        </td>
      </tr>
      {storyData.writers.map((writer, idx) => (
        <tr key={idx}>
          <td>{idx === 0 ? "Writers:" : null}</td>
          <td>{writer}</td>
        </tr>
      ))}
      </tbody>
    </table>
  </div>
) 

export default StoryInfo
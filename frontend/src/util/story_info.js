const StoryInfo = storyData => (
  <div>
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
          {storyData.currentUser}
        </td>
      </tr>
      <tr>
        <td>
          Writers:
        </td>
        <td>
          {storyData.writers[0]}
        </td>
      </tr>
      {storyData.writers.map((writer, idx) => (
        <tr key={idx}>
          <td></td>
          <td>{writer}</td>
        </tr>
      ))}
      </tbody>
    </table>
  </div>
) 

export default StoryInfo
export const ChatRoom = () => {
  return (
    <>
      <h1>Chat Room</h1>
      <div>
        <div className="users">
          <span className="user"></span>
        </div>
        <div>
          <h2>Name</h2>
          <div className="chat"></div>
          <div className="send-box">
            <input type="text" />
            <button className="btn">Send</button>
          </div>
        </div>
      </div>
    </>
  );
};

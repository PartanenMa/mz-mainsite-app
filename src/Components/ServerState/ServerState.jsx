import "./ServerState.scss";

function ServerState(props) {
    return (
        <div
            className="ServerStateContainer"
            style={{
                backgroundColor: props.connected ? "green" : "red",
                border: props.connected ? "1px solid lightgreen" : "1px solid lightcoral",
            }}
        >
            <p style={{ color: props.connected ? "lightgreen" : "lightcoral" }}>SERVER {props.connected ? "CONNECTED" : "DISCONNECTED"}</p>
        </div>
    );
}

export default ServerState;

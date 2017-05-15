import * as React from "react";

class UnauthorizedPage extends React.Component<any, void> {
    public render() {
        return (
            <h1 style={{ color: "red" }}>Unauthorized!</h1>
        );
    }
}

export default UnauthorizedPage;
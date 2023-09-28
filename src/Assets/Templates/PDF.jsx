import { useState } from "react";

function PDF() {
    const styles = {
        body: {
            fontSize: "0.75rem",
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            color: "#000000",
            margin: "0 auto",
            position: "relative",
        },
        pspdfkitHeader: {
            fontSize: "0.625rem",
            textTransform: "uppercase",
            letterSpacing: "2px",
            fontWeight: 400,
            color: "#717885",
            marginTop: "2.5rem",
            marginBottom: "2.5rem",
            width: "100%",
        },
        headerColumns: {
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: "2.5rem",
            paddingRight: "2.5rem",
        },
        logo: {
            height: "1.5rem",
            width: "auto",
            marginRight: "1rem",
        },
        logotype: {
            display: "flex",
            alignItems: "center",
            fontWeight: 700,
        },
        h2: {
            fontFamily: "Space Mono, monospace",
            fontSize: "1.25rem",
            fontWeight: 400,
        },
        h4: {
            fontFamily: "Space Mono, monospace",
            fontSize: "1rem",
            fontWeight: 400,
        },
        page: {
            marginLeft: "5rem",
            marginRight: "5rem",
        },
        introTable: {
            display: "flex",
            justifyContent: "space-between",
            margin: "3rem 0 3rem 0",
            borderTop: "1px solid #000000",
            borderBottom: "1px solid #000000",
        },
        introForm: {
            display: "flex",
            flexDirection: "column",
            borderRight: "1px solid #000000",
            width: "50%",
        },
        introFormLast: {
            borderRight: "none",
        },
        introTableTitle: {
            fontSize: "0.625rem",
            margin: 0,
        },
        introFormItem: {
            padding: "1.25rem 1.5rem 1.25rem 1.5rem",
        },
        introFormItemFirst: {
            paddingLeft: 0,
        },
        introFormItemLast: {
            paddingRight: 0,
        },
        introFormItemBorder: {
            padding: "1.25rem 0 0.75rem 1.5rem",
            borderBottom: "1px solid #000000",
        },
        introFormItemBorderLast: {
            borderBottom: "none",
        },
        form: {
            display: "flex",
            flexDirection: "column",
            marginTop: "6rem",
        },
        noBorder: {
            border: "none",
        },
        border: {
            border: "1px solid #000000",
        },
        borderBottom: {
            border: "1px solid #000000",
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
        },
        signer: {
            display: "flex",
            justifyContent: "space-between",
            gap: "2.5rem",
            margin: "2rem 0 2rem 0",
        },
        signerItem: {
            flexGrow: 1,
        },
        input: {
            color: "#4537de",
            fontFamily: "Space Mono, monospace",
            textAlign: "center",
            marginTop: "1.5rem",
            height: "4rem",
            width: "100%",
            boxSizing: "border-box",
        },
        inputDateNotes: {
            textAlign: "left",
        },
        inputSignature: {
            height: "8rem",
        },
        introText: {
            width: "60%",
        },
        tableBoxTable: {
            width: "100%",
            fontSize: "0.625rem",
        },
        tableBoxTablePadding: {
            paddingTop: "2rem",
        },
        tableBoxTableFirstLast: {
            width: "50%",
        },
        tableBoxTableTextRight: {
            textAlign: "right",
        },
        tableBoxTableTrHeading: {
            borderTop: "1px solid #000000",
            borderBottom: "1px solid #000000",
            height: "1.5rem",
        },
        tableBoxTableTrItem: {
            borderBottom: "1px solid #d7dce4",
            height: "1.5rem",
        },
        summaryBoxTableTrNoBorderItem: {
            borderBottom: "none",
            height: "1.5rem",
        },
        summaryBoxTableTrTotal: {
            borderTop: "1px solid #000000",
            borderBottom: "1px solid #000000",
            height: "1.5rem",
        },
        summaryBoxTableTrItemFirstTotalFirst: {
            border: "none",
            height: "1.5rem",
        },
        button: {
            background: "#4537de",
            borderColor: "#4537de",
            boxShadow: "0 0.1rem 0.3rem #4537de66",
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1rem",
            fontVariationSettings: '"wght" 550',
            fontWeight: 400,
            padding: "0.75rem 1.5rem",
            textAlign: "center",
            margin: "10px auto",
        },
    };

    const [inputValue, setInputValue] = useState({
        note: "",
        date: "",
        issued: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            [name]: value,
        });
    };

    return (
        <div style={styles.body}>
            <div id="pspdfkit-header" style={styles.pspdfkitHeader}>
                <div className="header-columns" style={styles.headerColumns}>
                    <div className="logotype" style={styles.logotype}>
                        <img className="logo" src="logo.svg" alt="logo" style={styles.logo} />
                        <p>Company</p>
                    </div>

                    <div>
                        <p>[Company Info]</p>
                    </div>
                </div>
            </div>

            <div className="page" style={styles.page}>
                <div>
                    <h2 style={styles.h2}>Receipt #</h2>
                </div>

                <div className="intro-table" style={styles.introTable}>
                    <div className="intro-form intro-form-item" style={styles.introForm}>
                        <p className="intro-table-title" style={styles.introTableTitle}>
                            Billed To:
                        </p>
                        <p>
                            Company Ltd.
                            <br />
                            Address
                            <br />
                            Country
                            <br />
                            VAT ID: ATU12345678
                        </p>
                    </div>

                    <div className="intro-form" style={styles.introFormLast}>
                        <div className="intro-form-item-border" style={styles.introFormItemBorder}>
                            <p className="intro-table-title" style={styles.introTableTitle}>
                                Payment Date:
                            </p>
                            <p>November 22nd 2021</p>
                        </div>

                        <div className="intro-form-item-border" style={styles.introFormItemBorder}>
                            <p className="intro-table-title" style={styles.introTableTitle}>
                                Payment Method:
                            </p>
                            <p>Bank Transfer</p>
                        </div>
                    </div>
                </div>

                <div className="table-box">
                    <table style={styles.tableBoxTable}>
                        <tbody>
                            <tr className="heading" style={styles.tableBoxTableTrHeading}>
                                <td>Description</td>
                                <td>QTY</td>
                                <td>Unit Price</td>
                                <td>Total</td>
                            </tr>

                            <tr className="item" style={styles.tableBoxTableTrItem}>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>

                            <tr className="item" style={styles.tableBoxTableTrItem}>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>

                            <tr className="item" style={styles.tableBoxTableTrItem}>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>

                            <tr className="item" style={styles.tableBoxTableTrItem}>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>

                            <tr className="item" style={styles.tableBoxTableTrItem}>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>

                            <tr className="item" style={styles.tableBoxTableTrItem}>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="summary-box">
                    <table style={styles.tableBoxTable}>
                        <tbody>
                            <tr className="item" style={styles.tableBoxTableTrItem}>
                                <td></td>
                                <td>Subtotal:</td>
                                <td></td>
                            </tr>

                            <tr className="item" style={styles.tableBoxTableTrItem}>
                                <td></td>
                                <td>Discount:</td>
                                <td></td>
                            </tr>

                            <tr className="item" style={styles.tableBoxTableTrItem}>
                                <td></td>
                                <td>Subtotal Less Discount:</td>
                                <td></td>
                            </tr>

                            <tr className="item" style={styles.tableBoxTableTrItem}>
                                <td></td>
                                <td>Tax Rate:</td>
                                <td></td>
                            </tr>

                            <tr className="item" style={styles.tableBoxTableTrItem}>
                                <td></td>
                                <td>Total Tax:</td>
                                <td></td>
                            </tr>

                            <tr className="item" style={styles.tableBoxTableTrItem}>
                                <td></td>
                                <td>Shipping/Handling:</td>
                                <td></td>
                            </tr>

                            <tr className="no-border-item" style={styles.summaryBoxTableTrNoBorderItem}>
                                <td></td>
                                <td>Total Due:</td>
                                <td></td>
                            </tr>

                            <tr className="total" style={styles.summaryBoxTableTrTotal}>
                                <td></td>
                                <td>Amount Paid:</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="page" style={styles.page}>
                <div>
                    <h4 style={styles.h4}>Thank you for your purchase!</h4>
                </div>

                <div className="form" style={styles.form}>
                    <label htmlFor="notes" className="label">
                        Notes:
                    </label>
                    <input
                        type="text"
                        id="notes"
                        className="border-bottom"
                        value={inputValue.note}
                        onChange={handleChange}
                        style={{ ...styles.input, ...styles.inputDateNotes }}
                    />
                </div>

                <div className="signer" style={styles.signer}>
                    <div className="form signer-item" style={styles.signerItem}>
                        <label htmlFor="date" className="label">
                            Date:
                        </label>
                        <input
                            type="text"
                            id="date"
                            className="border-bottom"
                            value={inputValue.date}
                            onChange={handleChange}
                            style={styles.input}
                        />
                    </div>

                    <div className="form signer-item" style={styles.signerItem}>
                        <label htmlFor="signature" className="label">
                            Issued by:
                        </label>
                        <input
                            type="text"
                            id="signature"
                            className="border"
                            value={inputValue.issued}
                            onChange={handleChange}
                            style={{ ...styles.input, ...styles.inputSignature }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PDF;

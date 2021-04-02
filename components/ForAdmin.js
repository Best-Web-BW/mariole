import { inject, observer } from "mobx-react";
const ForAdmin = ({ store: { admin }, children }) => admin ? children : null;
export default inject("store")(observer(ForAdmin));
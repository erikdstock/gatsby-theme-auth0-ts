import Enzyme from "enzyme"
import Adapter from "enzyme-adapter-react-16"

process.env.AUTH0_DOMAIN = "liddlestjames.microsoft.com"
process.env.AUTH0_CLIENT_ID = "maxwell"

Enzyme.configure({ adapter: new Adapter() })

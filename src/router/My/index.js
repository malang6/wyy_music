
import Artist from "../../views/My/Artist"
import PlayList from "../../views/My/PlayList"
import Radio from "../../views/My/Radio"
import My from "../../views/My"

const my = [
    {
        path: "/my",
        component: My,
        children: [
            {
                path: "/my/artist",
                component: Artist
            },
            {
                path: "/my/playlist",
                component: PlayList
            },
            {
                path: "/my/radio",
                component: Radio
            }
        ]
    }

]

export default my

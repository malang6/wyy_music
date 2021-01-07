
import Artist from "../../views/My/Artist"
import PlayList from "../../views/My/PlayList"
import Radio from "../../views/My/Radio"
import Edit from "../../views/My/Edit"
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
                name:"myPlaylist",
                component: PlayList
            },
            {
                path: "/my/radio",
                component: Radio
            },
            {
                path: "/my/edit",
                component: Edit
            },
        ]
    }
    
]

export default my

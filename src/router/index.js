import Vue from "vue";
import VueRouter from "vue-router";
const Djradio = () => import("@views/djradio");
const Category = () => import("@views/category");
const Artist = () => import("@views/artist");
const Discover = () => import("@views/Discover/Discover");
const Toplist = () => import("../views/TopList/TopList");
const NavCont = () => import("@views/artist/navCont");
const SingerTypeCont = () => import("@views/artist/singerTypeCont");
import User from "@views/User";
import UHome from "@views/User/UHome";
import UEvent from "@views/User/UEvent";
import UFollow from "@views/User/UFollow";
import Friend from "@views/Friend";
import My from "@views/My";
import myArtist from "@views/My/Artist";
import Edit from "@views/My/Edit";
import EditImage from "@views/My/EditImage";
import PlayList from "@views/My/PlayList";
import Radio from "@views/My/Radio";
import SearchSong from "@views/SearchSong";
import qPlaylist from "../views/Discover/playlist.vue";
import PlaylistID from "../views/discoverID/playlistID.vue";
import NewCD from "../views/newCD/newCD.vue";
import Newcdinfo from "../views/newcdinfo/newcdinfo.vue";

const push = VueRouter.prototype.push;
const replace = VueRouter.prototype.replace;

VueRouter.prototype.push = function (location, onComplete, onAbort) {
  if (onComplete && onAbort) {
    return push.call(this, location, onComplete, onAbort);
  }
  return push.call(this, location, onComplete, () => { });
};
VueRouter.prototype.replace = function (location, onComplete, onAbort) {
  if (onComplete && onAbort) {
    return replace.call(this, location, onComplete, onAbort);
  }
  return replace.call(this, location, onComplete, () => { });
};
Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: Discover,
      children: [
        {
          path: "discover",
          component: Discover,
          children: [
            {
              name: "djradio",
              path: "djradio",
              component: Djradio,
              children: [
                {
                  name: "category",
                  path: "category",
                  component: Category
                }
              ]
            },
            {
              name: "artist",
              path: "artist",
              component: Artist,
              children: [
                {
                  name: "recommond",
                  path: "recommond",
                  component: NavCont
                },
                {
                  name: "signed",
                  path: "signed",
                  component: NavCont
                },
                {
                  name: "cat",
                  path: "cat",
                  component: SingerTypeCont
                },
                {
                  path: "",
                  redirect: "recommond"
                }
              ]
            },
            {
              path: "toplist",
              component: Toplist
            },
            {
              name: "Playlist",
              path: "playlist",
              component: qPlaylist,
              children: [
                {
                  name: "PlaylistID",
                  path: "playlistId",
                  component: PlaylistID
                }
              ]
            },
            {
              name: "NewCD",
              path: "album",
              component: NewCD,
              children: [
                {
                  name: "Newcdinfo",
                  path: "albumId",
                  component: Newcdinfo
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: "",
      redirect: Discover
    },
    {
      path: "/user",
      component: User,
      children: [
        {
          name: "home",
          path: "home",
          component: UHome
        },
        {
          name: "event",
          path: "event",
          component: UEvent
        },
        {
          name: "follows",
          path: "follows",
          component: UFollow
        },
        {
          name: "fans",
          path: "fans",
          component: UFollow
        }
      ]
    },
    {
      path: "/search/m/",
      component: SearchSong
    },
    {
      path: "/friend",
      component: Friend
    },
    {
      path: "/my",
      component: My,
      children: [
        {
          name: "artist",
          path: "artist",
          component: myArtist
        },
        {
          path: "edit",
          component: Edit
        },
        {
          path: "playList",
          component: PlayList
        },
        {
          path: "radio",
          component: Radio
        },
        {
          path: "editimage",
          component: EditImage
        },
        {
          path: "",
          redirect: "artist"
        }
      ]
    }
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});
export default router;

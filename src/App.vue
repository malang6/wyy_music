<template>
	<div id="app">
		<Header />
		<router-view></router-view>
		<Footer />
		<div class="btm_bar"><MusicPlayer/></div>
	</div>
</template>

<script>
import Header from '@comps/Header';
import Footer from '@comps/Footer';
import MusicPlayer from '@comps/MusicPlayer';
export default {
	name: 'App',
	components: {
		Header,
		Footer,
		MusicPlayer
	}
};
</script>

<style lang="stylus" scoped>
#app
	min-width 982px
	background-color #f5f5f5
	position relative
	.btm_bar
		position fixed
		bottom 0
		height 20px
		width 100%
		z-index 10
</style>

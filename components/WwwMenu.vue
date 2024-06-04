<template>
    <div class="sticky">
        <div class="nav-menu">
            <div class="mobile-logo pure-g">
                <div class="pure-u-1-2">
                    <div style="padding-left: 0rem;margin-left: 0;">
                        <a alt="NTP Logo"><img alt='NTP Logo' src="/static/img/logo.png" /></a>
                    </div>
                </div>
                <div class="pure-u-1-2">
                    <div style="padding-right: 0rem;text-align: right">
                        <i 
                        class="fas fa-bars" 
                        @click="isMenuMobile=!isMenuMobile"> Show
                        </i> 
                    </div>
                </div>
            </div>
            <div
                class="nav-content"
                :class="isMenuMobile ? 'open-menu' : 'closed-menu'"
            > 
                <div class="logo">
                    <div class="branding-logo">
                        <a alt="NTP Logo"><img alt='NTP Logo' src="/static/img/logo.png" /></a>
                    </div>
                </div> 

                <ul class="nav-items">
                    <li>Menu</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>

                <div class="login-button">
                    <div class="search-bar">
                        <form class="pure-form" method='GET' >
                            <input type="search" name='q' placeholder="search |" value=""
                            />
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const isMenuMobile = useState('isMenuMobile',() => false )
</script>

<style>
.sticky{
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 10000000000;
}
.logo .branding-logo{
    margin-top:0;
    padding-left: 7rem;
}
.login-button .search-bar{
    margin-top: 0;
    padding-right: 7rem;

}
.nav-menu {
    /* background-color: white; */
    /* background-color: var(--primary-color);
    border-bottom-color: var(--primary-color);
    border-bottom-width: 2px;
    border-bottom-style: solid; */
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
    padding: 0.2rem 1rem;
    
}
.nav-content {
    display: flex;
    justify-content: space-between;
    padding: 10px 30px;
    align-items: center;
}
.nav-items {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
    
}
.nav-items li {
    padding: 0 10px;
    /* margin-top: 20px; */
    /* font-size: "Lato"!important; */
    text-transform: uppercase;
    font-size: 10pt;
    /* font-weight: 700; */
}
.mobile-logo{
    display: none;
}
@media screen and (max-width: 1200px) {
    .logo .branding-logo{
        margin-top:0;
        padding-left: 3rem;
    }
    .login-button .search-bar{
        margin-top: 0;
        padding-right: 3rem;

    }
}
@media screen and (max-width: 1024px) {
    .logo .branding-logo{
        margin-top:0;
        padding-left: 2rem;
    }
    .login-button .search-bar{
        margin-top: 0;
        padding-right: 2rem;

    }
}
@media screen and (max-width: 800px) {
    .logo .branding-logo{
        margin-top:0;
        padding-left: 0.8rem;
    }
    .login-button .search-bar{
        margin-top: 0;
        padding-right: 0.8rem;

    }
}
@media screen and (max-width: 768px) {
    .nav-menu {
        padding-top: 10px;
        /* position: absolute; */
        width: 100%;
    }
    .open-menu {
        opacity: 1;
        height: 150px;
    }
    .closed-menu {
        opacity: 0;
        height: 0;
        padding: 0;
    }
    .nav-content {
        flex-direction: column;
        z-index: 100;
        position: relative;
        transition: all 0.2s ease-out;
    }
    .nav-items {
        flex-direction: column;
    }
    .mobile-logo{
        display: block;
    }
    .logo{
        display: none;
    }
}
</style>
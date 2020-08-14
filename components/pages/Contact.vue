<template>
  <div class="contact">
    <ContentArea>
      <h1 class="h1-small">
        Get in touch to make
        <TextSwap inline />
      </h1>
      <ColumnContainer no-padding>
        <Column wide>
          <p>{{ contact.introduction }}</p>
        </Column>
        <Column>
          <div class="contact__details">
            <div class="nomargin">
              <b>Call us</b>
              <div>
                <a :href="`tel:${contact.telephone}`">{{ contact.telephone }}</a>
              </div>
              <br>
              <b>New business</b>
              <div>
                <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
              </div>
            </div>
          </div>
        </Column>
      </ColumnContainer>
      <ColumnContainer no-padding>
        <Column wide>
          <div>
            <h2>Visit us</h2>
            <p class="large">
              {{ contact.visit }}
            </p>
          </div>
        </Column>
        <Column>
          <div class="contact__details nomargin">
            <div class="nomargin">
              <b>Address</b>
              <div v-html="contact.address" />
              <br>
              <p><a class="arrowLink arrowLink--small arrowLink--hover" href="https://www.google.com/maps/dir//Gramafilm,+80+Paul+Street,+London+EC2A+4NE/@51.525486,-0.08377,15z/data=!4m16!1m6!3m5!1s0x0:0x5e4d613314b08fa1!2sGramafilm!8m2!3d51.525486!4d-0.08377!4m8!1m0!1m5!1m1!1s0x48761caff556d2eb:0x5e4d613314b08fa1!2m2!1d-0.08377!2d51.525486!3e3" target="_blank" rel="noopener">Get directions</a></p>
            </div>
          </div>
        </Column>
      </ColumnContainer>
      <GMap
        ref="gMap"
        :center="contact.coordinates"
        :options="{fullscreenControl: false, streetViewControl: false, mapTypeControl: false, zoomControl: true, gestureHandling: 'cooperative', styles: mapStyle}"
        :zoom="18"
        class="map"
      >
        <GMapMarker :position="contact.coordinates" :options="{icon: '/logo.png'}" />
      </GMap>
    </ContentArea>
    <FollowUs />
  </div>
</template>

<script>
export default {
  components: {
    ContentArea: () => import('~/components/layout/ContentArea'),
    ColumnContainer: () => import('~/components/layout/ColumnContainer'),
    Column: () => import('~/components/layout/Column'),
    FollowUs: () => import('~/components/content/FollowUs'),
    TextSwap: () => import('~/components/content/TextSwap')
  },
  props: {
    contact: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      mapStyle: [
        {
          elementType: 'geometry',
          stylers: [
            {
              color: '#f5f5f5'
            }
          ]
        },
        {
          elementType: 'labels.icon',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#616161'
            }
          ]
        },
        {
          elementType: 'labels.text.stroke',
          stylers: [
            {
              color: '#f5f5f5'
            }
          ]
        },
        {
          featureType: 'administrative.land_parcel',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#bdbdbd'
            }
          ]
        },
        {
          featureType: 'poi',
          elementType: 'geometry',
          stylers: [
            {
              color: '#eeeeee'
            }
          ]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#757575'
            }
          ]
        },
        {
          featureType: 'poi.business',
          elementType: 'labels.icon',
          stylers: [
            {
              color: '#999999'
            },
            {
              visibility: 'on'
            }
          ]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [
            {
              color: '#e5e5e5'
            }
          ]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#c9c9c9'
            }
          ]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#9e9e9e'
            }
          ]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [
            {
              color: '#ffffff'
            }
          ]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#c7c7c7'
            },
            {
              visibility: 'on'
            }
          ]
        },
        {
          featureType: 'road.arterial',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#757575'
            }
          ]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#616161'
            }
          ]
        },
        {
          featureType: 'road.local',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#9e9e9e'
            }
          ]
        },
        {
          featureType: 'transit.line',
          elementType: 'geometry',
          stylers: [
            {
              color: '#e5e5e5'
            }
          ]
        },
        {
          featureType: 'transit.station',
          elementType: 'geometry',
          stylers: [
            {
              color: '#eeeeee'
            }
          ]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [
            {
              color: '#c9c9c9'
            }
          ]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#9e9e9e'
            }
          ]
        }
      ]
    }
  },
  mounted () {
    this.$store.commit('header/setDefaultColor', 'black')
    setTimeout(() => {
      this.$store.commit('header/setDefaultColor', 'black')
    }, 200)
  }
}
</script>

<style lang="stylus" scoped>
>>> .columns--no-padding .column
  padding-left 0
  padding-right 0

.contact
  &__details
    width 250px
    margin-left auto

.map
  height 750px

  @media (max-width $bp-sm)
    height 400px

>>> .GMap__Wrapper
  height 100%
</style>

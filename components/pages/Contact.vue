<template>
  <div class="contact">
    <ContentArea>
      <h1 class="h1-small">
        Get in touch if you want to
        <TextSwap inline />
      </h1>
      <ColumnContainer no-padding>
        <Column wide>
          <p>{{ contact.introduction }}</p>
        </Column>
        <Column>
          <div class="contact__details">
            <div class="nomargin">
              <b>Call the studio</b>
              <div v-html="contact.telephone" />
              <br>
              <b>For new business</b>
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

>>> .GMap__Wrapper
  height 100%
</style>

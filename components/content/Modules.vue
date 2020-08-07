<template>
  <div v-if="modules" class="showcase__container">
    <div v-for="(section, index) in modules" :key="`section-${index}`" class="fade fadeIn">
      <div v-if="section.__typename === 'ComponentModules1X4'" class="showcase__module showcase__module--1">
        <ColumnContainer center>
          <Column wide-w2>
            <div class="showcase__item showcase__item--1">
              <div class="showcase__media">
                <img v-if="section.mainimage" :src="setResponsive(section.mainimage.url)" :alt="section.mainimage.alternativeText">
                <Video v-else-if="section.mainvideo" :video="section.mainvideo" />
              </div>
              <div v-html="section.content" />
            </div>
          </Column>
          <Column>
            <div class="showcase__item showcase__item--2">
              <div class="showcase__media">
                <img v-if="section.image1" :src="setResponsive(section.image1.url)" :alt="section.image1.alternativeText">
                <Video v-else-if="section.video1" :video="section.video1" />
              </div>
              <div class="showcase__media">
                <img v-if="section.image2" :src="setResponsive(section.image2.url)" :alt="section.image2.alternativeText">
                <Video v-else-if="section.video2" :video="section.video2" />
              </div>
              <div class="showcase__media">
                <img v-if="section.image3" :src="setResponsive(section.image3.url)" :alt="section.image3.alternativeText">
                <Video v-else-if="section.video3" :video="section.video3" />
              </div>
              <div class="showcase__media">
                <img v-if="section.image4" :src="setResponsive(section.image4.url)" :alt="section.image4.alternativeText">
                <Video v-else-if="section.video4" :video="section.video4" />
              </div>
            </div>
          </Column>
        </ColumnContainer>
      </div>
      <div v-else-if="section.__typename === 'ComponentModules3X1'" class="showcase__module showcase__module--3">
        <ColumnContainer center>
          <Column>
            <div class="showcase__item showcase__item--2">
              <div class="showcase__media">
                <img v-if="section.image1" :src="setResponsive(section.image1.url)" :alt="section.image1.alternativeText">
                <Video v-else-if="section.video1" :video="section.video1" />
              </div>
              <div class="showcase__media">
                <img v-if="section.image2" :src="setResponsive(section.image2.url)" :alt="section.image2.alternativeText">
                <Video v-else-if="section.video2" :video="section.video2" />
              </div>
              <div class="showcase__media">
                <img v-if="section.image3" :src="setResponsive(section.image3.url)" :alt="section.image3.alternativeText">
                <Video v-else-if="section.video3" :video="section.video3" />
              </div>
            </div>
          </Column>
          <Column wide-w2>
            <div class="showcase__item showcase__item--1">
              <div class="showcase__media">
                <img v-if="section.mainimage" :src="setResponsive(section.mainimage.url)" :alt="section.mainimage.alternativeText">
                <Video v-else-if="section.mainvideo" :video="section.mainvideo" />
              </div>
              <div v-html="section.content" />
            </div>
          </Column>
        </ColumnContainer>
      </div>
      <div v-else-if="section.__typename === 'ComponentModules1X1X1'" class="showcase__module showcase__module--2">
        <ColumnContainer>
          <Column>
            <div class="showcase__item">
              <div class="showcase__media">
                <img v-if="section.column1image" :src="setResponsive(section.column1image.url)" :alt="section.column1image.alternativeText">
                <Video v-else-if="section.column1video" :video="section.column1video" />
              </div>
              <div v-html="section.column1content" />
            </div>
          </Column>
          <Column>
            <div class="showcase__item">
              <div class="showcase__media">
                <img v-if="section.column2image" :src="setResponsive(section.column2image.url)" :alt="section.column2image.alternativeText">
                <Video v-else-if="section.column2video" :video="section.column2video" />
              </div>
              <div v-html="section.column2content" />
            </div>
          </Column>
          <Column>
            <div class="showcase__item">
              <div class="showcase__media">
                <img v-if="section.column3image" :src="setResponsive(section.column3image.url)" :alt="section.column3image.alternativeText">
                <Video v-else-if="section.column3video" :video="section.column3video" />
              </div>
              <div v-html="section.column3content" />
            </div>
          </Column>
        </ColumnContainer>
      </div>
      <Quote v-else-if="section.__typename === 'ComponentModulesQuote'">
        <template slot="quote">
          {{ section.quote }}
        </template>
        <template v-if="section.citation" slot="cite">
          <div v-html="section.citation.replace(/\n/g, '<br>')" />
        </template>
      </Quote>
      <div v-if="section.__typename === 'ComponentModulesVideo'" class="showcase__module" :class="{ ' showcase__module--6': section.fullscreen}">
        <div v-if="section.fullscreen" class="showcase__item">
          <div class="showcase__media">
            <img v-if="section.image" :src="setResponsive(section.image.url)" :alt="section.image.alternativeText">
            <Video v-else-if="section.qvideo" :video="section.qvideo" />
          </div>
        </div>
        <ColumnContainer v-else>
          <Column>
            <div class="showcase__item">
              <div class="showcase__media">
                <img v-if="section.image" :src="setResponsive(section.image.url)" :alt="section.image.alternativeText">
                <Video v-else-if="section.qvideo" :video="section.qvideo" />
                <div v-html="section.content" />
              </div>
            </div>
          </Column>
        </ColumnContainer>
      </div>
      <div v-else-if="section.__typename === 'ComponentModules1X1Textleft'" class="showcase__module showcase__module--4">
        <ColumnContainer center>
          <Column wide>
            <div class="showcase__item">
              <div v-html="section.content" />
            </div>
          </Column>
          <Column>
            <div class="showcase__item">
              <div class="showcase__media">
                <img v-if="section.image" :src="setResponsive(section.image.url)" :alt="section.image.alternativeText">
                <Video v-else-if="section.qvideo" :video="section.qvideo" />
              </div>
            </div>
          </Column>
        </ColumnContainer>
        <ColumnContainer center>
          <Column>
            <div class="showcase__item showcase__item--3">
              <div class="showcase__media">
                <img v-if="section.mainimage" :src="setResponsive(section.mainimage.url)" :alt="section.mainimage.alternativeText">
                <Video v-else-if="section.mainvideo" :video="section.mainvideo" />
              </div>
            </div>
          </Column>
        </ColumnContainer>
      </div>
      <div v-else-if="section.__typename === 'ComponentModules1X1Textright'" class="showcase__module showcase__module--5">
        <ColumnContainer center>
          <Column wide-w2>
            <div class="showcase__item">
              <div class="showcase__media">
                <img v-if="section.mainimage" :src="setResponsive(section.mainimage.url)" :alt="section.mainimage.alternativeText">
                <Video v-else-if="section.mainvideo" :video="section.mainvideo" />
              </div>
            </div>
          </Column>
          <Column>
            <div>
              <div v-html="section.content" />
            </div>
          </Column>
        </ColumnContainer>
        <ColumnContainer center>
          <Column>
            <div class="showcase__item showcase__item--4">
              <div class="showcase__media">
                <img v-if="section.image" :src="setResponsive(section.image.url)" :alt="section.image.alternativeText">
                <Video v-else-if="section.qvideo" :video="section.qvideo" />
              </div>
            </div>
          </Column>
        </ColumnContainer>
      </div>
    </div>
  </div>
</template>

<script>
import fadeIn from '~/helpers/fadeIn'
import { setResponsive } from '~/helpers/cdn'
export default {
  name: 'Modules',
  components: {
    Quote: () => import('~/components/content/Quote'),
    Video: () => import('~/components/content/Video'),
    ColumnContainer: () => import('~/components/layout/ColumnContainer'),
    Column: () => import('~/components/layout/Column')
  },
  props: {
    modules: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      setResponsive
    }
  },
  mounted () {
    fadeIn()
  }
}
</script>

define([
  'common/views/module_standalone',
  'extensions/collections/collection',
  'extensions/models/model',
  'extensions/views/view'
],
function (StandaloneView, Collection, Model, View) {
  describe("StandaloneView", function () {
    describe("getContent", function () {
      it("renders a module", function () {
        var Visualisation = View.extend({
          render: function () {
            this.$el.html('test content');
          }
        });
        var model = new Model();
        var collection = new Collection();
        var standaloneView = new StandaloneView({
          visualisationClass: Visualisation,
          className: 'testclass',
          collection: collection,
          model: model
        });

        var content = standaloneView.getContent();
        expect(content).toContain('class="testclass"');
        expect(content).toContain('<div class="visualisation">test content</div>');
      });

      it("renders a module with a fallback element", function () {
        jasmine.serverOnly(function () {
          var Visualisation = View.extend({
            render: function () {
              this.$el.html('test content');
            }
          });
          var model = new Model();
          var collection = new Collection();
          var standaloneView = new StandaloneView({
            visualisationClass: Visualisation,
            className: 'testclass',
            requiresSvg: true,
            url: '/testurl',
            collection: collection,
            model: model
          });

          var content = standaloneView.getContent();
          content = content.replace(/>\s+?</g, '><');
          expect(content).toContain('class="testclass"');
          expect(content).toContain('<div class="visualisation-fallback" data-src="/testurl.png?raw"><noscript><img src="/testurl.png?raw" /></noscript></div>');
        });
      });
    });
  });
});

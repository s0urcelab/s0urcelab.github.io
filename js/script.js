(function($){
  // Search
  var $searchWrap = $('#search-form-wrap'),
    isSearchAnim = false,
    searchAnimDuration = 200;

  var startSearchAnim = function(){
    isSearchAnim = true;
  };

  var stopSearchAnim = function(callback){
    setTimeout(function(){
      isSearchAnim = false;
      callback && callback();
    }, searchAnimDuration);
  };

  $('#nav-search-btn').on('click', function(){
    if (isSearchAnim) return;

    startSearchAnim();
    $searchWrap.addClass('on');
    stopSearchAnim(function(){
      $('.search-form-input').focus();
    });
  });

  $('.search-form-input').on('blur', function(){
    startSearchAnim();
    $searchWrap.removeClass('on');
    stopSearchAnim();
  });

  // Share
  $('body').on('click', function(){
    $('.article-share-box.on').removeClass('on');
  }).on('click', '.article-share-link', function(e){
    e.stopPropagation();

    var $this = $(this),
      url = $this.attr('data-url'),
      encodedUrl = encodeURIComponent(url),
      id = 'article-share-box-' + $this.attr('data-id'),
      offset = $this.offset();

    if ($('#' + id).length){
      var box = $('#' + id);

      if (box.hasClass('on')){
        box.removeClass('on');
        return;
      }
    } else {
      var html = [
        '<div id="' + id + '" class="article-share-box">',
          '<input class="article-share-input" value="' + url + '">',
          '<div class="article-share-links">',
            '<a href="https://twitter.com/intent/tweet?url=' + encodedUrl + '" class="article-share-twitter" target="_blank" title="Twitter"></a>',
            '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Facebook"></a>',
            '<a href="http://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="article-share-pinterest" target="_blank" title="Pinterest"></a>',
            '<a href="https://plus.google.com/share?url=' + encodedUrl + '" class="article-share-google" target="_blank" title="Google+"></a>',
          '</div>',
        '</div>'
      ].join('');

      var box = $(html);

      $('body').append(box);
    }

    $('.article-share-box.on').hide();

    box.css({
      top: offset.top + 25,
      left: offset.left
    }).addClass('on');
  }).on('click', '.article-share-box', function(e){
    e.stopPropagation();
  }).on('click', '.article-share-box-input', function(){
    $(this).select();
  }).on('click', '.article-share-box-link', function(e){
    e.preventDefault();
    e.stopPropagation();

    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  });

  // Caption
  $('.article-entry').each(function(i){
    $(this).find('img').each(function(){
      if ($(this).parent().hasClass('fancybox')) return;

      var alt = this.alt;

      if (alt) $(this).after('<span class="caption">' + alt + '</span>');

      $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
    });

    $(this).find('.fancybox').each(function(){
      $(this).attr('rel', 'article' + i);
    });
  });

  if ($.fancybox){
    $('.fancybox').fancybox();
  }

  // Mobile nav
  var $container = $('#container'),
    isMobileNavAnim = false,
    mobileNavAnimDuration = 200;

  var startMobileNavAnim = function(){
    isMobileNavAnim = true;
  };

  var stopMobileNavAnim = function(){
    setTimeout(function(){
      isMobileNavAnim = false;
    }, mobileNavAnimDuration);
  }

  $('#main-nav-toggle').on('click', function(){
    if (isMobileNavAnim) return;

    startMobileNavAnim();
    $container.toggleClass('mobile-nav-on');
    stopMobileNavAnim();
  });

  $('#wrap').on('click', function(){
    if (isMobileNavAnim || !$container.hasClass('mobile-nav-on')) return;

    $container.removeClass('mobile-nav-on');
  });
})(jQuery);

//canvas动画
var t = {
                width: 1.5,
                height: 10,
                depth: 10,
                segments: 13,
                slices: 6,
                xRange: 0.8,
                yRange: 0.1,
                zRange: 1,
                ambient: "#525252",
                diffuse: "#FFFFFF",
                speed: 0.0002
            };
            var G = {
                count: 2,
                xyScalar: 1,
                zOffset: 100,
                ambient: "#002c4a",
                diffuse: "#005584",
                speed: 0.001,
                speed: 0.001,
                gravity: 1200,
                dampening: 0.95,
                minLimit: 10,
                maxLimit: null,
                minDistance: 20,
                maxDistance: 400,
                autopilot: false,
                draw: false,
                bounds: CAV.Vector3.create(),
                step: CAV.Vector3.create(Math.randomInRange(0.2, 1), Math.randomInRange(0.2, 1), Math.randomInRange(0.2, 1))
            };
            var m = "canvas";
            var E = "svg";
            var x = {
                renderer: m
            };
            var i, n = Date.now();
            var L = CAV.Vector3.create();
            var k = CAV.Vector3.create();
            var z = document.getElementById("header-outer");
            var w = document.getElementById("anitOut");
            var D, I, h, q, y;
            var g;
            var r;

            function C() {
                F();
                p();
                s();
                B();
                v();
                K(z.offsetWidth, z.offsetHeight);
                o()
            }

            function F() {
                g = new CAV.CanvasRenderer();
                H(x.renderer)
            }

            function H(N) {
                if (D) {
                    w.removeChild(D.element)
                }
                switch (N) {
                    case m:
                        D = g;
                        break
                }
                D.setSize(z.offsetWidth, z.offsetHeight);
                w.appendChild(D.element)
            }

            function p() {
                I = new CAV.Scene()
            }

            function s() {
                I.remove(h);
                D.clear();
                q = new CAV.Plane(t.width * D.width, t.height * D.height, t.segments, t.slices);
                y = new CAV.Material(t.ambient, t.diffuse);
                h = new CAV.Mesh(q, y);
                I.add(h);
                var N, O;
                for (N = q.vertices.length - 1; N >= 0; N--) {
                    O = q.vertices[N];
                    O.anchor = CAV.Vector3.clone(O.position);
                    O.step = CAV.Vector3.create(Math.randomInRange(0.2, 1), Math.randomInRange(0.2, 1), Math.randomInRange(0.2, 1));
                    O.time = Math.randomInRange(0, Math.PIM2)
                }
            }

            function B() {
                var O, N;
                for (O = I.lights.length - 1; O >= 0; O--) {
                    N = I.lights[O];
                    I.remove(N)
                }
                D.clear();
                for (O = 0; O < G.count; O++) {
                    N = new CAV.Light(G.ambient, G.diffuse);
                    N.ambientHex = N.ambient.format();
                    N.diffuseHex = N.diffuse.format();
                    I.add(N);
                    N.mass = Math.randomInRange(0.5, 1);
                    N.velocity = CAV.Vector3.create();
                    N.acceleration = CAV.Vector3.create();
                    N.force = CAV.Vector3.create()
                }
            }

            function K(O, N) {
                D.setSize(O, N);
                CAV.Vector3.set(L, D.halfWidth, D.halfHeight);
                s()
            }

            function o() {
                i = Date.now() - n;
                u();
                M();
                requestAnimationFrame(o)
            }

            function u() {
                var Q, P, O, R, T, V, U, S = t.depth / 2;
                CAV.Vector3.copy(G.bounds, L);
                CAV.Vector3.multiplyScalar(G.bounds, G.xyScalar);
                CAV.Vector3.setZ(k, G.zOffset);
                for (R = I.lights.length - 1; R >= 0; R--) {
                    T = I.lights[R];
                    CAV.Vector3.setZ(T.position, G.zOffset);
                    var N = Math.clamp(CAV.Vector3.distanceSquared(T.position, k), G.minDistance, G.maxDistance);
                    var W = G.gravity * T.mass / N;
                    CAV.Vector3.subtractVectors(T.force, k, T.position);
                    CAV.Vector3.normalise(T.force);
                    CAV.Vector3.multiplyScalar(T.force, W);
                    CAV.Vector3.set(T.acceleration);
                    CAV.Vector3.add(T.acceleration, T.force);
                    CAV.Vector3.add(T.velocity, T.acceleration);
                    CAV.Vector3.multiplyScalar(T.velocity, G.dampening);
                    CAV.Vector3.limit(T.velocity, G.minLimit, G.maxLimit);
                    CAV.Vector3.add(T.position, T.velocity)
                }
                for (V = q.vertices.length - 1; V >= 0; V--) {
                    U = q.vertices[V];
                    Q = Math.sin(U.time + U.step[0] * i * t.speed);
                    P = Math.cos(U.time + U.step[1] * i * t.speed);
                    O = Math.sin(U.time + U.step[2] * i * t.speed);
                    CAV.Vector3.set(U.position, t.xRange * q.segmentWidth * Q, t.yRange * q.sliceHeight * P, t.zRange * S * O - S);
                    CAV.Vector3.add(U.position, U.anchor)
                }
                q.dirty = true
            }

            function M() {
                D.render(I)
            }

            function J(O) {
                var Q, N, S = O;
                var P = function(T) {
                    for (Q = 0, l = I.lights.length; Q < l; Q++) {
                        N = I.lights[Q];
                        N.ambient.set(T);
                        N.ambientHex = N.ambient.format()
                    }
                };
                var R = function(T) {
                    for (Q = 0, l = I.lights.length; Q < l; Q++) {
                        N = I.lights[Q];
                        N.diffuse.set(T);
                        N.diffuseHex = N.diffuse.format()
                    }
                };
                return {
                    set: function() {
                        P(S[0]);
                        R(S[1])
                    }
                }
            }

            function v() {
                window.addEventListener("resize", j)
            }

            function A(N) {
                CAV.Vector3.set(k, N.x, D.height - N.y);
                CAV.Vector3.subtract(k, L)
            }

            function j(N) {
                K(z.offsetWidth, z.offsetHeight);
                M()
            }
            C();
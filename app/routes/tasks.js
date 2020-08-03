import Route from '@ember/routing/route';
import RealtimeRouteMixin from 'emberfire/mixins/realtime-route';
import PerformanceRouteMixin from 'emberfire/mixins/performance-route';
//  model hook
export default Route.extend(RealtimeRouteMixin, PerformanceRouteMixin, {
  model() {
    return this.store.findAll('task');
  }
});


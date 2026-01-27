import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import BottomNav from "@/components/BottomNav";
import { AiAssistantPopup } from "@/components/AiAssistantPopup";

// Company Pages
import AboutPage from "@/pages/AboutPage";
import HowItWorksPage from "@/pages/HowItWorksPage";
import HowWeEarnPage from "@/pages/HowWeEarnPage";
import ContactPage from "@/pages/ContactPage";

// Legal Pages
import PrivacyPage from "@/pages/PrivacyPage";
import TermsPage from "@/pages/TermsPage";
import AffiliateDisclosurePage from "@/pages/AffiliateDisclosurePage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />

      {/* Company Pages */}
      <Route path="/about" component={AboutPage} />
      <Route path="/how-it-works" component={HowItWorksPage} />
      <Route path="/how-we-earn" component={HowWeEarnPage} />
      <Route path="/contact" component={ContactPage} />

      {/* Legal Pages */}
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/terms" component={TermsPage} />
      <Route path="/affiliate-disclosure" component={AffiliateDisclosurePage} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <AiAssistantPopup />
        <BottomNav />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;


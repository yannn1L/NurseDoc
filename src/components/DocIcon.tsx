import React from 'react';
import {
  ClipboardList,
  NotebookPen,
  BookOpen,
  ShieldCheck,
  DoorOpen,
  Calendar,
  Sparkles,
  Info,
  ShieldAlert,
  AlertCircle,
  FileText,
  LayoutDashboard,
  Printer,
  FileDown,
  FileType2,
  GraduationCap,
  Stethoscope,
  ListTree,
  Eye,
  CheckCircle2,
} from 'lucide-react';

export const getLucideIcon = (name: string, className = 'w-4 h-4') => {
  switch (name) {
    case 'clipboard-list':
      return <ClipboardList className={className} />;
    case 'notebook-pen':
      return <NotebookPen className={className} />;
    case 'book-open':
      return <BookOpen className={className} />;
    case 'shield-check':
      return <ShieldCheck className={className} />;
    case 'door-open':
      return <DoorOpen className={className} />;
    case 'calendar':
      return <Calendar className={className} />;
    case 'sparkles':
      return <Sparkles className={className} />;
    case 'shield-alert':
      return <ShieldAlert className={className} />;
    case 'alert-circle':
      return <AlertCircle className={className} />;
    case 'file-text':
      return <FileText className={className} />;
    case 'layout-dashboard':
      return <LayoutDashboard className={className} />;
    case 'printer':
      return <Printer className={className} />;
    case 'file-down':
      return <FileDown className={className} />;
    case 'file-type-2':
      return <FileType2 className={className} />;
    case 'graduation-cap':
      return <GraduationCap className={className} />;
    case 'stethoscope':
      return <Stethoscope className={className} />;
    case 'list-tree':
      return <ListTree className={className} />;
    case 'eye':
      return <Eye className={className} />;
    case 'check-circle':
      return <CheckCircle2 className={className} />;
    case 'info':
    default:
      return <Info className={className} />;
  }
};
